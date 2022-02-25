import { AppBar, Button, Toolbar } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import '../../../styles/header.css';

export const Header = ({ logout }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <div className="header">
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  logout: PropTypes.func.isRequired
};
