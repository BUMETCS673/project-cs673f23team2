import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB2uwZ0FwmPGgwtA95Jg_GOC2BHC1Rl6_w",
  authDomain: "focused-study-f648a.firebaseapp.com",
  projectId: "focused-study-f648a",
  storageBucket: "focused-study-f648a.appspot.com",
  messagingSenderId: "46110739618",
  appId: "1:46110739618:web:00aca148c48bf938485bfb",
  measurementId: "G-MELNYR69CF"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export function signInWithGoogle(navigate){

  signInWithPopup(auth, provider)
  .then(async (result) => {
  
    const userDetails = {
      name: result.user.displayName,
      email: result.user.email,
      profile: result.user.photoURL,
      userId: result.user.uid
    };
    
    // Navigate user to add hobbies
    navigate('/onboarding', { state: {user: userDetails} });
  })
  .catch((error) => {
    //TODO: Add a Error while sign-in component
    console.log(error);
  });
};