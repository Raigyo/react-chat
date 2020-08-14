//Firebase service

//YES with the API Key! ^^

//import and initialize Firebase
import firebase from 'firebase';
import "firebase/auth";
import "firebase/database";

const config = {
    //See config file provided in Firebase project

    //apiKey: "ADD-YOUR-DETAILS-HERE",
    //authDomain: "ADD-YOUR-DETAILS-HERE",
    //databaseURL: "ADD-YOUR-DETAILS-HERE"

};
firebase.initializeApp(config);
//export the authentication and database modules
export const auth = firebase.auth;
export const db = firebase.database();