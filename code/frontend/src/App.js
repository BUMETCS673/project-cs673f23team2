import React, { useLayoutEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from './assets/logo_with_text.svg';
import { signInWithGoogle } from "./firebase";
import { getAuth } from "firebase/auth";
import './styles/App.css';
import OnboardingPage from './components/OnboardingPage';
import Search from './components/Search';
import EducationalVideoFeed from './components/EducationalVideoFeed';
<<<<<<< HEAD
import EntertainmentFeed from './components/EntertainmentFeed';
import SeeAllVideos from './components/SeeAllVideos'
import UserProfile from './components/UserProfile';
import VideoHistory from './components/VideoHistory';
import OnboardingPage from './components/OnboardingPage';
import { signInWithGoogle } from "./firebase";
import VideoDetails from './components/VideoDetails'
=======
>>>>>>> 6d08d38 (SE-40: Code integration)

function App() {
  const [isAuth, setAuthStatus] = useState(false)
  const navigate = useNavigate();

  const updateAuthStatus = (authValue) =>{
    setAuthStatus(authValue)
  }

  useLayoutEffect(()=>{
    getAuth().onAuthStateChanged((userCred) => {
      if(userCred){
        updateAuthStatus(true)
      }
    })
  }, [isAuth])

  const screenToShow = () => {

    if(isAuth){
      return(<Search />)
    }else{
      return (
        <div className="AppSignInContainerWrapper">
          <div className="AppSignInLogoContainerWrapper">
            <Logo data-cy="appBanner" className="ApplicationLogo" />
          </div>
          <div className="AppSignInButtonContainerWrapper">
            <button data-cy="signInButton" onClick={() => signInWithGoogle(navigate)}>Sign-In with Google</button>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={screenToShow()} />
        <Route path='/onboarding' element={<OnboardingPage />} />
        <Route path='/search' element={<Search />} />
        <Route path='/browse' element={<EducationalVideoFeed />} />
<<<<<<< HEAD
        <Route path='/entertainment-browse' element={<EntertainmentFeed />} />
        <Route path='/all' element={<SeeAllVideos />} />
        <Route path='/users/:userId' element={<UserProfile />} />
        <Route path='/users/:userId/video-history' element={<VideoHistory />} />
        <Route path='/onboarding' element={<OnboardingPage />} />
        <Route path='/video/:id' element={<VideoDetails />} />
=======
>>>>>>> 6d08d38 (SE-40: Code integration)
      </Routes>
    </div>
  );
}

export default App;
