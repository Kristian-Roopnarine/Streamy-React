import React from 'react'
import {connect} from 'react-redux'
import {signIn,signOut} from '../actions'

class GoogleAuth extends React.Component {

    // when the component mounts load the library required for OAuth
    componentDidMount(){
        window.gapi.load('client:auth2',()=>{

            // configure the OAuth client when the library loads
            window.gapi.client.init({
                clientId:'908791074391-rvdi4u4208kr5p20enuenh5khehq5dqs.apps.googleusercontent.com',
                scope:'email'

            // get the auth instance to access different variables
            }).then(()=>{

                // assign the auth instance to this.auth so the component can access it
                this.auth = window.gapi.auth2.getAuthInstance();

                // detects if a user is signed in
                this.onAuthChange
                // returns true if signed in
                (this.auth.isSignedIn.get())

                // Why do we call this??
                this.auth.isSignedIn.listen
                (this.onAuthChange)
            });
        });
    }

    // helper function to detect changes
    onAuthChange = (isSignedIn) => {
        if (isSignedIn){

            // action that is passed down
            // passes in userId to store in state
            this.props.signIn(this.auth.currentUser.get().getId())
        } else {
            this.props.signOut()
        }
    }

    onSignInClick = () => {
        // when sign in button click trigger this action
        // this is a function from the google api library
        this.auth.signIn();
    }

    onSignOutClick = () => {
        // function from the google api library
        // when sign out button is click trigger this action
        this.auth.signOut();
    }

    // determines which button to render
    renderAuthButton(){
        if(this.props.isSignedIn === null){
            return null;
        } else if (this.props.isSignedIn){
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon"></i>
                    Sign Out
                </button>
            )
        } else {
            return (
                <button onClick={this.onSignInClick}className="ui red google button">
                    <i className="google icon"></i>
                    Sign In With Google
                </button>
            )
        }
    }

    render(){
        return(<div>{this.renderAuthButton()}</div>)
    }
}



const mapStateToProps = (state) => {
    // initial state is passed down to this component as a prop
    return {isSignedIn:state.auth.isSignedIn}
}

export default connect(mapStateToProps,{

    // pass the actions down to this component
    signIn,signOut

})(GoogleAuth)