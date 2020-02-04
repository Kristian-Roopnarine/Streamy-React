import React from 'react'
import { Field,reduxForm } from 'redux-form'


class StreamForm extends React.Component{

    renderError = ({error,touched}) => {

        // when a user clicks away from the form input
        if (touched && error){
            return(
                <div className="ui error message">
                    <div className="header">
                        {error}
                    </div>
                </div>
            )
        }
    }

    renderInput = ({input,label,meta}) => {
        const className= `field ${meta.error && meta.touched ? 'error': ''}` 
        return (

            // form input fields
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off"/>
                {this.renderError(meta)}
            </div>
        )
    }

    // this callback function is passed down from parent
    // both createStream and editStream
    // they refer back to the actions
    onSubmit = (formValues) => {
        this.props.onSubmit(formValues)
    }

    render(){
        return (
            <form 
                // redux form syntax
                onSubmit={this.props.handleSubmit(this.onSubmit)} 
                className="ui form error"
            >

                <Field 
                    label="Enter Title"
                    name="title" 
                    component={this.renderInput}
                />

                <Field 
                    label="Enter Description"
                    name="description" 
                    component={this.renderInput}
                />
                <button className="ui button primary">Submit</button>
            </form>
        )
    }
}


const validate = (formValues) => {
    
    // formValues is a param from redux form
    // checks if the form violates any errors
    const errors = {}
    if (!formValues.title){
        errors.title = "You must enter a title"
    }

    if(!formValues.description) {
        errors.description = "You must enter a description"
    }
    return errors
}


export default reduxForm({
    form:'streamForm',
    validate:validate
})(StreamForm);

