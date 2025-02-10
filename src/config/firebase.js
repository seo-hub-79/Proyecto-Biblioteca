// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwD6wspIG6JKsV9t1QKMLiSWqjXR-EpXo",
  authDomain: "trabajofinal-f5498.firebaseapp.com",
  projectId: "trabajofinal-f5498",
  storageBucket: "trabajofinal-f5498.firebasestorage.app",
  messagingSenderId: "682287781842",
  appId: "1:682287781842:web:5a7deadc8d4fe29bf59a0b",
  measurementId: "G-QG1XCT50VP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);

