import {SIGN_IN,SIGN_OUT} from '../actions/types'

// state when the app is loaded
// no users signed in
// no userId
const INITIAL_STATE = {
    isSignedIn:null,
    userId:null,
};


export default (state=INITIAL_STATE,action) => {
    switch(action.type){
        case SIGN_IN:
            
            // create a new object
            // update the state to changed signed in
            // pass the userId in the state
            return {...state,isSignedIn:true,userId:action.payload};

        case SIGN_OUT:

            // create a new object
            // update the state to signed out
            return {...state,isSignedIn:false,userId:null};
        default:
            return state
    }
};