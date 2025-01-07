// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeO0L_La2-1MixNYMbr7RbjxFVD5fQpbs",
  authDomain: "login-auth-e2873.firebaseapp.com",
  projectId: "login-auth-e2873",
  storageBucket: "login-auth-e2873.appspot.com",
  messagingSenderId: "179667138194",
  appId: "1:179667138194:web:3dcd285918f9513458984b",
};  

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // this is firebase cloud store
export const auth = getAuth(); // this will helps to register user to firebase console or firebase project

//--------------------------------------------------------------------------------------------------

// this is the firebase component that connect our react app with firebase

// export const auth = getAuth() // auth is variable and getAuth() is function to register user to firebase

// export const db = getFirestore(app) // db = database = varable // getFirestore is firebase cloud storage

// in this we are using two databases or services from firebase
// first one is auth that stores some of information or detail for example:- it does not store first name and last name
// second one is db fire store that store all data, informatiion, details of user

// email= arontaniya2003@gmail.com
// pasword = taniya@20
