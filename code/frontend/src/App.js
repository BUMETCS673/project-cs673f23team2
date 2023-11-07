import './styles/App.css';
import React, { Component }  from 'react';
import {Route, Routes, Link} from 'react-router-dom';
import {ReactComponent as Logo} from './assets/logo_with_text.svg';
import Search from './components/Search';
import EducationalVideoFeed from './components/EducationalVideoFeed';
import EntertainmentFeed from './components/EntertainmentFeed';

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
      </Routes>
    </div>
  );
}

export default App;
