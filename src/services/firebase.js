//Firebase service

//YES with the API Key! ^^

//import and initialize Firebase
import firebase from 'firebase';
import "firebase/auth";
import "firebase/database";

const config = {
    //See config file provided in Firebase project
    //apiKey: "ADD-YOUR-DETAILS-HERE",
    apiKey: "AIzaSyAHZ5MCO_ZUluwh5fO7qrhJ0dIzP44SqHw",
    //authDomain: "ADD-YOUR-DETAILS-HERE",
    //authDomain: "chatty-online.firebaseapp.com",
    //databaseURL: "ADD-YOUR-DETAILS-HERE"
    databaseURL: "https://chatty-online.firebaseio.com",
    //Callback url: https://chatty-online.firebaseapp.com/__/auth/handler
};
firebase.initializeApp(config);
//export the authentication and database modules
export const auth = firebase.auth;
export const db = firebase.database();