import './styles/App.css';
import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { ReactComponent as Logo } from './assets/logo_with_text.svg';
import Search from './components/Search';
import EducationalVideoFeed from './components/EducationalVideoFeed';
import EntertainmentFeed from './components/EntertainmentFeed';
import SeeAllVideos from './components/SeeAllVideos'
import UserProfile from './components/UserProfile';
import VideoHistory from './components/VideoHistory';
import OnboardingPage from './OnboardingPage';

function App() {
  const screenToShow = () => {
    return (
      <div className="AppSignInContainerWrapper">
        <div className="AppSignInLogoContainerWrapper">
          <Logo data-cy="appBanner" className="ApplicationLogo" />
        </div>
        <div className="AppSignInButtonContainerWrapper">
          <Link to="/onboarding">Go to Onboarding Page</Link>
        </div>
      </div>
    );
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
        <Route path='/onboarding' element={<OnboardingPage />} />
      </Routes>
    </div>
  );
}

export default App;
