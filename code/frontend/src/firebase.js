// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcIKt31C-UootCE4IvuFVUJ1Wmm-ZHBsE",
  authDomain: "focused-study-12ccf.firebaseapp.com",
  projectId: "focused-study-12ccf",
  storageBucket: "focused-study-12ccf.appspot.com",
  messagingSenderId: "389940996553",
  appId: "1:389940996553:web:024166d5d91aa8a3d5a018",
  measurementId: "G-YPTJJ10MEG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        
      })
      .catch((error) => {
        console.log(error);
      });
  };