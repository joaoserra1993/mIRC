// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCbK9NK13eZBrnwtei9rs0-F6bns4WG2UE",
    authDomain: "mirc-chat-app.firebaseapp.com",
    projectId: "mirc-chat-app",
    storageBucket: "mirc-chat-app.appspot.com",
    messagingSenderId: "892834417241",
    appId: "1:892834417241:web:10ac02f8798d39317c7f48",
    measurementId: "G-WEDDGH43LL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth((app))
export const provider = new GoogleAuthProvider();