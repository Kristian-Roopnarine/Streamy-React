import React from 'react'
import {connect} from 'react-redux'
import {createStream} from '../../actions'
import StreamForm from './StreamForm'

class StreamCreate extends React.Component{

    onSubmit = (formValues) => {
        // calls the createStream action with the redux formValues
        // it is called from props because it is passed down from redux store
        this.props.createStream(formValues)
    }

    render(){
        return (
            <div>
                <h3>Create a stream</h3>
                <StreamForm 
                    // triggers action method
                    onSubmit= {this.onSubmit}
                />
            </div>
            
        )
    }
}


export default connect(null,{
    // pass down this action 
    createStream
})(StreamCreate);