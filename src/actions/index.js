import streams from '../apis/streams'
import {SIGN_OUT,SIGN_IN,CREATE_STREAM,EDIT_STREAM,DELETE_STREAM,FETCH_STREAM,FETCH_STREAMS} from './types'
import history from '../history'

/////////////////////////////////////////////////////////////////////////
// dispatch(action) is the only way to reflect changes in state
// it calls the reducers for the specific action
/////////////////////////////////////////////////////////////////////////


// when a user signs in define this action with the userId
// The userId is retrieved from the Google auth library and functions
// set the payload to be the userId
export const signIn = (userId) => {
    return {
        type:SIGN_IN,
        payload:userId
    }
}

// when a user signs out this will be the action called
export const signOut = () => {
    return {
        type:SIGN_OUT
    }
}

// when a user creates a stream
// the formValues input will be values given from the redux form
export const createStream = (formValues) => async (dispatch,getState) => {

    // we tie a specific stream with the user that created it
    const {userId} = getState().auth

    // make a post request to add a stream to the DB using the form values and adding userId
    // the spread operator is used to create an object using the form values with the userId
    const response = await streams.post('/streams',{...formValues,userId});

    // run this action through the dispatch and update the state of the store
    // we will call the create_stream reducer with the payload of the response data
    dispatch({type:CREATE_STREAM,payload:response.data})

    // after the stream is successfully created, navigate the user to the home page
    history.push('/')
}

// the action related to fetching streams
export const fetchStreams = () => async dispatch => {

    // make a get request to retrieve all of the streams from the DB
    const response = await streams.get('/streams')

    // update the state with the object of streams
    dispatch({type:FETCH_STREAMS,payload:response.data})
}

// the action related to fetching one stream
// takes in an argument of id, which is the id of the selected stream
export const fetchStream = (id) => async dispatch => {

    // make a get request to retrieve the specific stream
    const response = await streams.get(`/streams/${id}`)

    // update the stream state with the retrieved stream
    dispatch({type:FETCH_STREAM,payload:response.data})
}

// the action related to editing one stream
// the id is the id of the stream, formValues are the values that are modified from the redux form
export const editStream = (id,formValues) => async dispatch => {

    //patch ensures that only the modified attritbutes are changed and not the whole stream object
    const response = await streams.patch(`/streams/${id}`,formValues)

    // update the state
    dispatch({type:EDIT_STREAM,payload:response.data})

    // redirects to home page
    history.push('/')
}

// action related to deleting a stream
// requires the stream id
export const deleteStream = (id) => async dispatch =>{
    await streams.delete(`/streams/${id}`)

    // update the state
    dispatch({type:DELETE_STREAM,payload:id})
    history.push('/')
}