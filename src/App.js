//Imports components and provides routes

import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { auth } from "./services/firebase";
import './styles.css';

/*Our app has public routes (accessible without authentication) 
and a private route (accessible only with authentication). 
Because React doesn’t provide a way to check the authenticated state, 
we’ll create higher-order components (HOCs) for both types of routes.*/

//Private route
function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    //wrap a <Route>
    <Route
      {...rest}//spread attribute/operator: to get the remaining parameters passed from the router
      //pass props from the router to the <Route>
      //render the component depending on the authenticated state
      render={props =>
        authenticated === true ? (
          <Component {...props} />
        ) : 
        (//redirect the user to a specified route if the condition is not met
          <Redirect to={{ pathname: "/login", state: { from: props.location } }}/>
        )
      }
    />
  );
}//\PrivateRoute

//Public route
function PublicRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === false
        ? <Component {...props} />
        : <Redirect to='/chat' />}//renders our public route andredirects to the /chat path if the authenticated state becomes true
    />
  )
}//\PublicRoute

class App extends Component {
  //we’re setting the initial state of the app
  constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: true,
    };
  }//\constructor

  //Lifecycle hook (entry points to actions)
  componentDidMount() {
  //Firebase provides an intuitive method called onAuthStateChanged 
  //that is triggered when the authenticated state changes
    auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false
        });
      } else {
        this.setState({
          authenticated: false,
          loading: false
        });
      }
    });//\onAuthStateChanged
  }//\componentDidMount

  //rendering using HOCs
  render() {
    return this.state.loading === true ? <h2>Loading...</h2> : (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute 
            path="/chat"
            authenticated={this.state.authenticated} 
            component={Chat}>
          </PrivateRoute>
          <PublicRoute 
            path="/signup" 
            authenticated={this.state.authenticated} 
            component={Signup}>            
          </PublicRoute>
          <PublicRoute 
            path="/login" 
            authenticated={this.state.authenticated} 
            component={Login}>
          </PublicRoute>
        </Switch>
      </Router>
    );//\return
  }//\render
}//\class App 

export default App;