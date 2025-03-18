import { csrfFetch } from './csrf';

// --------- Action Types ------------
const GET_ALL_SPOTS = 'spots/getAllSpots';
// const CREATE_SPOT = 'spots/createSpot';
// const UPDATE_SPOT = 'spots/updateSpot';
// const DELETE_SPOT = 'spots/deleteSpot';

// --------- Action Creators ------------
const getAllSpotsAction = spots => {
    return {
        type: GET_ALL_SPOTS,
        payload: spots,
    };
};

// const createSpotAction = () => {
//     return {
//         type: 'CREATE_SPOT',
//         payload: new_spot,
//     };
// };

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

// --------- Thunks ------------
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

// --------- Reducers ------------
const initialState = {
    byId: {},
    allSpots: [],
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

        // case "CREATE_SPOT":
        default:
            return state;
    }
};

export default spotReducer;
