// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB03dNx43VrGiDB8Svt1H6_j64UUgbAgi8",
  authDomain: "tinder-5d836.firebaseapp.com",
  projectId: "tinder-5d836",
  storageBucket: "tinder-5d836.appspot.com",
  messagingSenderId: "648695021147",
  appId: "1:648695021147:web:1b67267b65e9c85326097e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

export {auth,db}