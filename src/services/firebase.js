//Firebase service

//YES with the API Key! ^^

//import and initialize Firebase
import firebase from 'firebase';
import "firebase/auth";
import "firebase/database";

const config = {
    //See config file provided in Firebase project
    //apiKey: "ADD-YOUR-DETAILS-HERE",
    apiKey: "AIzaSyDVNnhEa55EhJl17J7D8TQHUqgHv_G-PE8",
    //authDomain: "ADD-YOUR-DETAILS-HERE",
    authDomain: "chatty-a6893.firebaseapp.com",
    //databaseURL: "ADD-YOUR-DETAILS-HERE"
    databaseURL: "https://chatty-a6893.firebaseio.com"
};
firebase.initializeApp(config);
//export the authentication and database modules
export const auth = firebase.auth;
export const db = firebase.database();