import { combineReducers } from 'redux'
import { reducer } from 'redux-form'
import authReducer from './authReducer'
import streamReducer from './streamReducer'


// these are all the reducers
export default combineReducers({
    auth:authReducer,
    form:reducer,
    streams:streamReducer
})