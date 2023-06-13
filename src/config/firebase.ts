// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCnieRlk5giqlEzAQrK2H_TSUUXtbYWIKI",
    authDomain: "fir-app-40eea.firebaseapp.com",
    projectId: "fir-app-40eea",
    storageBucket: "fir-app-40eea.appspot.com",
    messagingSenderId: "612094270477",
    appId: "1:612094270477:web:0515ccfdfc800dfcb88944",
    measurementId: "G-Y02V7XBTL6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const GoogleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
