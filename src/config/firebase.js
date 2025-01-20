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
  apiKey: "AIzaSyAJKCzEY46KBrGoCNH6jyNIk7BTopQ655s",
  authDomain: "micomidafavorita-d2477.firebaseapp.com",
  projectId: "micomidafavorita-d2477",
  storageBucket: "micomidafavorita-d2477.firebasestorage.app",
  messagingSenderId: "649148230015",
  appId: "1:649148230015:web:df8d0c395958d56356d24a",
  measurementId: "G-JWP29C1N87"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);