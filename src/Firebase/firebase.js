// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBd7FTJm8aj49WRIsJhBSWxOgDw_rMtKEo",
  authDomain: "uidai-sih.firebaseapp.com",
  projectId: "uidai-sih",
  storageBucket: "uidai-sih.appspot.com",
  messagingSenderId: "315065378071",
  appId: "1:315065378071:web:dc99fc0d1045f2f0d14352",
  measurementId: "G-RSLJ7XETH5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, auth };