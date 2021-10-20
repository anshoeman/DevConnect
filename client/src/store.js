import { createStore,applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk'
import rootReducer from './reducers' //rootReducer combines all the reducers

const initialState = {} //All initial state in this

const middleware = [thunk]//All the middleware packed in this

const store = createStore(rootReducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))
//The store variable:
//composeWithDevTools will create store by passing a middleware that we initialized
//And the initialstate with all our reducers that we make

export default store