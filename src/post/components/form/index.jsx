import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import '../../../styles/form.css';

export const Form = ({ title, content, setNewFavorites, handleSubmit }) => {
  return (
    <div>
      <h2>Formulario</h2>
      <form>
        <div className="form">
          <input
            type="text"
            placeholder="titulo"
            value={title}
            onChange={(e) =>
              setNewFavorites((prevState) => ({
                ...prevState,
                title: e.target.value
              }))
            }
          />
          <textarea
            placeholder="contenido"
            value={content}
            onChange={(e) =>
              setNewFavorites((prevState) => ({
                ...prevState,
                content: e.target.value
              }))
            }
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            save
          </Button>
        </div>
      </form>
    </div>
  );
};

Form.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  setNewFavorites: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};
