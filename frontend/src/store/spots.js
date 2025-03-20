import { csrfFetch } from './csrf';

// ================== ACTION TYPES ==================
const GET_ALL_SPOTS = 'spots/getAllSpots';
const GET_A_SPOT = 'spots/getSpot';
const CREATE_SPOT = 'spots/createSpot';
// const UPDATE_SPOT = 'spots/updateSpot';
// const DELETE_SPOT = 'spots/deleteSpot';

// ================== ACTION CREATOR ==================
const getAllSpotsAction = spots => {
    return {
        type: GET_ALL_SPOTS,
        payload: spots,
    };
};

const getSpotAction = spot => {
    return {
        type: GET_A_SPOT,
        payload: spot,
    };
};

const createSpotAction = new_spot => {
    return {
        type: CREATE_SPOT,
        payload: new_spot,
    };
};

// const updateSpotAction = () => {
//     return {
//         type: 'UPDATE_SPOT',
//         payload: spot_to_update,
//     };
// };

// const deleteSpotAction = () => {
//     return {
//         type: 'DELETE_SPOT',
//         paylaod: spot_to_delete,
//     };
// };

// ================== THUNKS ==================

// Get all spots
export const getAllSpots = () => async dispatch => {
    try {
        const response = await csrfFetch('/api/spots');
        if (response.ok) {
            const data = await response.json();
            dispatch(getAllSpotsAction(data));
        } else {
            throw response;
        }
    } catch (error) {
        return error;
    }
};

// Get spot detail
export const getSpotDetail = spotId => async dispatch => {
    try {
        const response = await csrfFetch('/api/spots/' + `${spotId}`);
        if (response.ok) {
            const data = await response.json();
            dispatch(getSpotAction(data));
        } else {
            throw response;
        }
    } catch (error) {
        console.error(error);
    }
};

// Create a new spot
export const createSpot = spotData => async dispatch => {
    try {
        const response = await csrfFetch('/api/spots', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(spotData),
        });
        if (response.ok) {
            const data = await response.json();
            dispatch(createSpotAction(data));
            return data;
        } else {
            let error = await response.json();
            return error;
        }
    } catch (error) {
        console.error(error);
    }
};

// ================== REDUCER ==================
const initialState = {
    byId: {},
    allSpots: [],
    spotDetail: [],
};

const spotReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case GET_ALL_SPOTS:
            newState = { ...state };
            let spots = action.payload;
            //Update new state
            newState.allSpots = spots;

            const newById = { ...newState.byId };
            for (let spot of spots) {
                newById[spot.id] = spot;
            }
            //Update new state
            newState.byId = newById;

            return newState;

        case GET_A_SPOT:
            newState = { ...state };
            let spot = action.payload;

            newState.spotDetail = spot;
            newState.byId = { ...newState.byId, [spot.id]: spot };

            return newState;

        case CREATE_SPOT:
            newState = { ...state };
            let newSpot = action.payload;

            newState.spotDetail = newSpot;
            newState.byId = { ...newState.byId, [newSpot.id]: newSpot };

            return newState;

        default:
            return state;
    }
};

export default spotReducer;
