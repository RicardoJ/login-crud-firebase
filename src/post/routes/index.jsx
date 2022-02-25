import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebaseConfig';
import { Home } from '../pages/authenticated/home';
import Login from '../pages/unauthenticated/login';

function Main() {
  const [user] = useAuthState(auth);

  return (
    <Router>
      <Routes>
        {user ? (
          <>
            <Route exact path="/home" element={<Home />} />
            <Route path="*" element={<Home />} />
          </>
        ) : (
          <>
            <Route exact path="/" element={<Login />} />
            <Route path="*" element={<Login />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default Main;
