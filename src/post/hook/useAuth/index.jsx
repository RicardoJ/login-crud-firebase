import React, { useContext, useEffect, useState } from 'react';
import { app } from '../../../config/firebaseConfig';

const Auth = React.createContext();

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    app.auth().onAuthStateChanged(function (user) {
      setUser(user);
      setShowChild(true);
    });
  }, []);

  if (!showChild) {
    return <div>loading</div>;
  } else {
    return (
      <Auth.Provider
        value={{
          user
        }}
      >
        {children}
      </Auth.Provider>
    );
  }
};

const useUser = () => {
  const context = useContext(Auth);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};

export { useUser, AuthContext };
