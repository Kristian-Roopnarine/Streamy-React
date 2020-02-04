// These are the different types of actions we can have in our application
// They are stored here to help prevent typos and errors can be traced back to this file.


// This will be used for the actions when a user signs in
export const SIGN_IN = 'SIGN_IN'

// This will be used for the actions when a user signs out
export const SIGN_OUT = 'SIGN_OUT'

// When a user creates a stream
export const CREATE_STREAM = 'CREATE_STREAM'

// When a user visits the home page and the api makes a request to retrieve all streams
export const FETCH_STREAMS = 'FETCH_STREAMS'

// when the user edits, or clicks on a stream
export const FETCH_STREAM = 'FETCH_STREAM'

// When a user clicks to delete a stream
export const DELETE_STREAM = 'DELETE_STREAM'

// When we user edits a stream
export const EDIT_STREAM = 'EDIT_STREAM'