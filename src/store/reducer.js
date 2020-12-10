import {UPDATE_BOOLEAN, UPDATE_OBJECT, UPDATE_STRING, UPDATE_VALUE} from "./actions";

const initialState = {
    padding: 0,
    margin: 0,
    border: 0,
    radius: 0,
    reset: false,
    painting: true,
    bubbleStructure: {},
    color: "#FFFFFF"
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case UPDATE_VALUE:
            return {
                ...state,
                [action.payload.state]: parseInt(action.payload.value, 10)
            }
        case UPDATE_BOOLEAN:
            return {
                ...state,
                [action.payload.state]: action.payload.value
            }
        case UPDATE_STRING:
            return {
                ...state,
                [action.payload.state]: action.payload.value
            }
        case UPDATE_OBJECT:
            return {
                ...state,
                [action.payload.state]: action.payload.value
            }
        default:
            return state
    }
};

export default reducer;