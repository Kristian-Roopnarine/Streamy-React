import _ from 'lodash'
import React from 'react'
import {connect} from 'react-redux'
import {fetchStream,editStream} from '../../actions'
import StreamForm from './StreamForm'

class StreamEdit extends React.Component{

    // when the user is directed to this URL fetch the specific stream to edit
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id)
    }

    // triggers action to change state
    onSubmit = (formValues) =>{

        // streamId is the first parameter, modified values are the second parameter
        this.props.editStream(this.props.match.params.id,formValues)
    }

    render(){
        if(!this.props.stream){
            return <div>Loading...</div>
        }
        return (
            <div>
                <h3>Edit a stream</h3>
                <StreamForm 
                    onSubmit={this.onSubmit}
                    
                    // pulls stream title and description to populate the form
                    initialValues=
                    {_.pick(this.props.stream,'title','description')}
                />
            </div>
        )
    }
}

const mapStateToProps = (state,ownProps) => {

    // using ownProps because the stream id is a prop in the component
    // the stream is passed down as a prop to this component
    return {stream:state.streams[ownProps.match.params.id]}
}

export default connect(mapStateToProps,{
    // passing down these actions to this component
    fetchStream,editStream
})(StreamEdit);