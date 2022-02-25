import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  auth,
  logInWithEmailAndPassword,
  signInWithFacebook,
  signInWithGoogle
} from '../../../../config/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';

import '../../../../styles/login.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate('/home');
  }, [user, loading, navigate]);
  return (
    <div className="login">
      <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="login__btn"
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          Login
        </button>
        <button className="login__btn login__google" onClick={signInWithGoogle}>
          Login with Google
        </button>
        <button
          className="login__btn login__facebook"
          onClick={signInWithFacebook}
        >
          Login with Facebook
        </button>
      </div>
    </div>
  );
};
export default Login;
