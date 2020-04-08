// Signup page

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { signup, signInWithGoogle, signInWithGitHub, signInWithFacebook } from '../helpers/auth';

export default class SignUp extends Component {
    /*We’re setting the initial state of the page. 
    We’re also binding the handleChange and handleSubmit methods to the component’s this scope.*/
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          email: '',
          password: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.googleSignIn = this.googleSignIn.bind(this);
        this.githubSignIn = this.githubSignIn.bind(this);
        this.facebookSignIn = this.facebookSignIn.bind(this);
    }//\constructor

    //dynamically determine the key and set the corresponding state variable (computed properties)
    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
    }//\handleChange

    //Signup with email
    async handleSubmit(event) {
        event.preventDefault();//preventing the default behavior for form submissions 
        this.setState({ error: '' });//clearing up the error state variable
        try {
            //using the signup() method imported from helpers/auth 
            //to pass the email and password entered by the user
            await signup(this.state.email, this.state.password);
            /*If the registration is successful, users get redirected to the /Chats route. 
            This is possible with the combination of onAuthStateChanged and the HOCs we created in App.js. */
        } catch (error) {
            //If registration fails, we set the error variable which displays a message to users
            this.setState({ error: error.message });
        }
    }//\handleSubmit

    //Signup with Google
    async googleSignIn() {
        try {
          await signInWithGoogle();
        } catch (error) {
          this.setState({ error: error.message });
        }
    }//\googleSignIn

    //Signup with Github
    async githubSignIn() {
        try {
          await signInWithGitHub();
        } catch (error) {
          console.log(error)
          this.setState({ error: error.message });
        }
    }//\githubSignIn

    //Signup with Facebook
    async facebookSignIn() {
        try {
          await signInWithFacebook();
        } catch (error) {
          this.setState({ error: error.message });
        }
    }//\facebookSignIn

    render() {
        return (
            <div className="container">
            <form 
                className="mt-5 py-5 px-5"
                autoComplete="off"
                onSubmit={this.handleSubmit}>
                <h1>
                Sign Up to
                <Link className="title ml-2" to="/">Chatty</Link>
                </h1>
                <p className="lead">Fill in the form below to create an account.</p>
                <div className="form-group">
                <input className="form-control" placeholder="Email" name="email" type="email" onChange={this.handleChange} value={this.state.email}></input>
                </div>
                <div className="form-group">
                <input className="form-control" placeholder="Password" name="password" onChange={this.handleChange} value={this.state.password} type="password"></input>
                </div>
                <div className="form-group">
                {this.state.error ? <p className="text-danger">{this.state.error}</p> : null}
                <button className="btn btn-primary px-5" type="submit">Sign up</button>
                </div>
                <p>You can also sign up with any of these services</p>
                <button className="btn btn-danger mr-2" type="button" onClick={this.googleSignIn}>
                    Sign up with Google
                </button>
                <button className="btn btn-secondary mr-2" type="button" onClick={this.githubSignIn}>
                    Sign up with GitHub
                </button>
                <button className="btn btn-primary mr-2" type="button" onClick={this.facebookSignIn}>
                    Sign up with Facebook
                </button>
                <hr></hr>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </form>
            </div>
        )//\return
    }//\render


}//\class SignUp 