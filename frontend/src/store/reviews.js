import { csrfFetch } from './csrf';

// ================== ACTION TYPES ==================
const GET_SPOT_REVIEWS = 'reviews/getSpotReviews';
const CREATE_REVIEW = 'reviews/createReview';
const DELETE_REVIEW = 'reviews/deleteReview';

// ================== ACTION CREATOR ==================
const getSpotReviewsAction = spotId => {
    return {
        type: GET_SPOT_REVIEWS,
        payload: spotId,
    };
};

const createReviewAction = new_review => {
    return {
        type: CREATE_REVIEW,
        payload: new_review,
    };
};

const deleteReviewAction = reviewId => {
    return {
        type: DELETE_REVIEW,
        payload: reviewId,
    };
};

// ================== THUNKS ==================

// Get all reviews for a spot Id
export const getSpotReviews = spotId => async dispatch => {
    try {
        const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
        if (response.ok) {
            const data = await response.json();
            dispatch(getSpotReviewsAction(data));
        } else {
            throw response;
        }
    } catch (error) {
        return error;
    }
};

// Create a new review
export const createReviewThunk = (spotId, reviewData) => async dispatch => {
    try {
        const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reviewData),
        });
        if (response.ok) {
            const newReview = await response.json();
            dispatch(createReviewAction(newReview));
            return newReview;
        } else {
            let error = await response.json();
            return error;
        }
    } catch (error) {
        console.error(error);
    }
};

// Delete a review
export const deleteReviewThunk = reviewId => async dispatch => {
    try {
        const response = await csrfFetch(`/api/reviews/${reviewId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            const reponse = await response.json();
            return reponse;
        }

        dispatch(deleteReviewAction(data));
    } catch (error) {
        console.error(error);
    }
};

// ================== REDUCER ==================
const initialState = {
    byId: {},
    allReviews: [],
};

const reviewReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case GET_SPOT_REVIEWS:
            newState = { ...state };
            let reviews = action.payload.Reviews;
            //Update new state
            newState.allReviews = reviews;

            const newById = { ...newState.byId };
            for (let review of reviews) {
                newById[review.id] = review;
            }
            //Update new state
            newState.byId = newById;

            return newState;

        case CREATE_REVIEW:
            newState = { ...state };
            let newReview = action.payload;

            newState.reviewDetail = newReview;
            newState.byId = { ...newState.byId, [newReview.id]: newReview };

            return newState;

        case DELETE_REVIEW:
            newState = { ...state };
            delete newState.reviewDetail;
            delete newState.byId[action.payload.reviewId];

            return newState;

        default:
            return state;
    }
};

export default reviewReducer;
