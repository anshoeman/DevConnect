import { SET_ALERT,REMOVE_ALERT } from "../actions/types";
const initialState = [];//It will be an empty array it is a initial state 
//which has the alerts state 
//action will take payload (data) and type

export default function(state=initialState,action){
    const {type,payload} = action;
    switch(type){
        case SET_ALERT:
            return [...state,payload]//we did give the previous state and then we passed the data to the state
        case REMOVE_ALERT:
            return state.filter(alert=>alert.id!==payload) //Uff idk whats filter
        default:
            return state
    }
}