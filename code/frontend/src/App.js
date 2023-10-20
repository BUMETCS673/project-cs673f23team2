import './styles/App.css';
import React, { Component }  from 'react';
<<<<<<< HEAD
import {Route, Routes, Link} from 'react-router-dom';
import {ReactComponent as Logo} from './assets/logo_with_text.svg';
import Search from './components/Search';
import EducationalVideoFeed from './components/EducationalVideoFeed';
=======
import {Route, Routes} from 'react-router-dom';
import {ReactComponent as Logo} from './assets/logo_with_text.svg';
>>>>>>> 17f3921fe149f02dbe890c8bf3d38b968bcef9ab

function App() {

  const screenToShow = () => {
    return(
      <div className="AppSignInContainerWrapper">
          <div className="AppSignInLogoContainerWrapper">
<<<<<<< HEAD
            <Logo data-cy="appBanner" className="ApplicationLogo"/>
          </div>
          <div className="AppSignInButtonContainerWrapper">
            <Link to="/search">
              <button data-cy="signInButton">Sign-In with Google</button>
            </Link>
=======
            <Logo className="ApplicationLogo"/>
          </div>
          <div className="AppSignInButtonContainerWrapper">
            <button>Sign-In with Google</button>
>>>>>>> 17f3921fe149f02dbe890c8bf3d38b968bcef9ab
          </div>
        </div>
    )
  }

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={screenToShow()} />
<<<<<<< HEAD
        <Route path='/search' element={<Search />} />
        <Route path='/browse' element={<EducationalVideoFeed />} />
=======
>>>>>>> 17f3921fe149f02dbe890c8bf3d38b968bcef9ab
      </Routes>
    </div>
  );
}

export default App;
