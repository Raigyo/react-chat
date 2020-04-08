//Authentication component (helper)

//import the auth module from the service
import { auth } from "../services/firebase";

//signup will create a new user using their email and password
export function signup(email, password) {
    return auth().createUserWithEmailAndPassword(email, password);
}  

//signin will log in an existing user created with email and password
export function signin(email, password) {
    return auth().signInWithEmailAndPassword(email, password);
}

//signin with Google
export function signInWithGoogle() {
    //we’re creating an instance of the GoogleAuthProvider
    const provider = new auth.GoogleAuthProvider();
    //we’re calling signInWithPopup with the provider as a parameter
    //When this method is called, a pop up will appear and take the user 
    //through the Google sign in flow before redirecting them back to the app
    return auth().signInWithPopup(provider);
}

//signin with GitHub
export function signInWithGitHub() {
    const provider = new auth.GithubAuthProvider();
return auth().signInWithPopup(provider);
}

//signin with Facebook
export function signInWithFacebook() {
    const provider = new auth.FacebookAuthProvider();
return auth().signInWithPopup(provider);
}

//Logout
export function logout() {
    return auth().signOut();
}