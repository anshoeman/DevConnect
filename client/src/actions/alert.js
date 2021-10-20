import {SET_ALERT,REMOVE_ALERT} from './types'
//Random generate an id
//When we want to dispatch more thn one function we have disptach function
import uuid from 'uuid'
export const setAlert = (msg,alertType)=> dispatch =>{
    const id = uuid.v4();
    dispatch({
        type:SET_ALERT,
        payload:{msg,alertType,id}
    })
}