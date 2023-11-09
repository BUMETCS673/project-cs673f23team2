import './styles/App.css';
import React, { Component }  from 'react';
import {Route, Routes, Link} from 'react-router-dom';
import {ReactComponent as Logo} from './assets/logo_with_text.svg';
import Search from './components/Search';
import EducationalVideoFeed from './components/EducationalVideoFeed';
import EntertainmentFeed from './components/EntertainmentFeed';
import SeeAllVideos from './components/SeeAllVideos'
import UserProfile from './components/UserProfile';
import VideoHistory from './components/VideoHistory';

function App() {

  const screenToShow = () => {
    return(
      <div className="AppSignInContainerWrapper">
          <div className="AppSignInLogoContainerWrapper">
            <Logo data-cy="appBanner" className="ApplicationLogo"/>
          </div>
          <div className="AppSignInButtonContainerWrapper">
            <Link to="/search">
              <button data-cy="signInButton">Sign-In with Google</button>
            </Link>
          </div>
        </div>
    )
  }

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={screenToShow()} />
        <Route path='/search' element={<Search />} />
        <Route path='/browse' element={<EducationalVideoFeed />} />
        <Route path='/entertainment-browse' element={<EntertainmentFeed />} />
        <Route path='/all' element={<SeeAllVideos />} />
        <Route path='/users/:userId' element={<UserProfile />} />
        <Route path='/users/:userId/video-history' element={<VideoHistory />} />
      </Routes>
    </div>
  );
}

export default App;
