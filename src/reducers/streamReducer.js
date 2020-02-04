import _ from 'lodash'
import {FETCH_STREAM,FETCH_STREAMS,CREATE_STREAM,EDIT_STREAM,DELETE_STREAM} from '../actions/types'

//////////////////////////////
// NEED TO GO BACK TO REVIEW THIS SYNTAX
/////////////////////////////


// reducers that apply to the stream actions
// given a default state of {} because when the page is loaded for the first time the reducers are run once
export default (state = {},action) => {

    // switch checks for different actions
    switch(action.type){

        // return a new object containing the specified stream
        case FETCH_STREAM:
            return { ...state, [action.payload.id]:action.payload }
        
        // return a new object that adds a stream to the state
        case CREATE_STREAM:
            return {...state, [action.payload.id]:action.payload}
        
        // returns the stream to be edited
        case EDIT_STREAM:
            return{...state, [action.payload.id]:action.payload}
        
        // uses lodash to remove the specified stream
        // action.payload contains the stream id 
        case DELETE_STREAM:
            return _.omit(state,action.payload)
        
        // converts the object retrieved from a GET request to an object with the key being the stream id
        // and the value being the stream object
        case FETCH_STREAMS:
            return {...state,..._.mapKeys(action.payload,'id')}

        default:
            return state
    }
}