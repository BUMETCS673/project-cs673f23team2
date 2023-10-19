import './styles/App.css';
import React, { Component }  from 'react';
import {Route, Routes} from 'react-router-dom';
import {ReactComponent as Logo} from './assets/logo_with_text.svg';

function App() {

  const screenToShow = () => {
    return(
      <div className="AppSignInContainerWrapper">
          <div className="AppSignInLogoContainerWrapper">
            <Logo className="ApplicationLogo"/>
          </div>
          <div className="AppSignInButtonContainerWrapper">
            <button>Sign-In with Google</button>
          </div>
        </div>
    )
  }

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={screenToShow()} />
      </Routes>
    </div>
  );
}

export default App;
