// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "intellijot-e79f1.firebaseapp.com",
  projectId: "intellijot-e79f1",
  storageBucket: "intellijot-e79f1.appspot.com",
  messagingSenderId: "135637335074",
  appId: "1:135637335074:web:fcfb0f80d032da49f19e7b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);