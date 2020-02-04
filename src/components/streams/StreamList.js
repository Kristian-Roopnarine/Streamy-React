import React from 'react'
import {connect} from 'react-redux'
import {fetchStreams} from '../../actions'
import {Link} from 'react-router-dom'


class StreamList extends React.Component{

    // home page to get all streams
    componentDidMount(){
        this.props.fetchStreams()
    }

    renderList = () => {

        // converts the objects to lists
        return this.props.streams.map(stream =>{
            return(
                <div className="item" key={stream.id}>
                    {this.renderAdmin(stream)}
                    <i className="large middle aligned icon camera" />
                    <div className="content">
                        <Link to={`/streams/${stream.id}`}
                            className="header"
                        >
                            {stream.title}
                        </Link>
                        <div className="description">
                            {stream.description}
                        </div>
                    </div>
                </div>
            )
        })
    }

    // renders buttons for streams that the user created
    renderAdmin = (stream) => {
        if (stream.userId === this.props.currentUserId){
            return (
                <div className="right floated content">

                    {/* links are used because they allow for navigation in router */}
                    <Link 
                    className="ui button primary"
                    to = {`/streams/edit/${stream.id}`}
                    >
                        Edit
                    </Link>
                    <Link 
                    className="ui button negative"
                    to = {`/streams/delete/${stream.id}`}
                    >
                        Delete
                    </Link>
                </div>
            )
        }
    }

    // allows users to create streams if they're signed in
    renderCreate = () => {
        if (this.props.isSignedIn){
            return(
                <div style={{textAlign:'right'}}>
                    <Link 
                    to="/streams/new"
                    className="ui button primary"
                    >
                        Create Stream
                    </Link>
                </div>
            )
        }
    }

    render(){
        return (
        <div>
            <h2>Streams</h2>
            <div className="ui celled list">
                {this.renderList()}
            </div>
            {this.renderCreate()}
        </div>
        )
    }   
}



const mapStateToProps = (state) => {

    // allows this component to access state from redux store
    // Object.values() turns the object into an array to map over
    // currentUserId pulled from auth object in google auth

    return {streams:Object.values(state.streams),
    currentUserId:state.auth.userId,
    isSignedIn:state.auth.isSignedIn}
}


export default connect(mapStateToProps,{fetchStreams})(StreamList);