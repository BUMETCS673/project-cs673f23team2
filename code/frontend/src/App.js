import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from './assets/logo_with_text.svg';
import { signInWithGoogle } from "./firebase";
import { getAuth } from "firebase/auth";
import './styles/App.css';
import OnboardingPage from './components/OnboardingPage';
import Search from './components/Search';
import EducationalFeed from './components/EducationalFeed';
import EntertainmentFeed from './components/EntertainmentFeed';
import SeeAllVideos from './components/SeeAllVideos'
import UserProfile from './components/UserProfile';
import VideoHistory from './components/VideoHistory';
import VideoDetails from './components/VideoDetails'
import Dashboard from './components/Dashboard';


function App() {
  const [isAuth, setAuthStatus] = useState(false)
  const navigate = useNavigate();

  const updateAuthStatus = (authValue) =>{
    setAuthStatus(authValue)
  }

  useEffect(()=>{
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
        <Route path='/search' element={<Search />} />
        <Route path='/browse' element={<EducationalFeed />} />
        <Route path='/entertainment-browse' element={<EntertainmentFeed />} />
        <Route path='/seemorevideos' element={<SeeAllVideos />} />
        <Route path='/userProfile' element={<UserProfile />} />
        <Route path='/videoHistory' element={<VideoHistory />} />
        <Route path='/onboarding' element={<OnboardingPage />} />
        <Route path='/watchvideo' element={<VideoDetails />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;