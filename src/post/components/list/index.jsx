import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import '../../../styles/list.css';

export const List = ({ isLoading, list, onClick, buttonName }) => {
  return (
    <ul>
      {isLoading && !list ? (
        <h1>Loading... </h1>
      ) : (
        list?.map((item) => (
          <li key={item.id} className="list">
            <span>{item.title}</span>
            <Button
              variant="contained"
              color="primary"
              onClick={() => onClick(item)}
            >
              {buttonName}
            </Button>
          </li>
        ))
      )}
    </ul>
  );
};

List.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  list: PropTypes.array,
  buttonName: PropTypes.string,
  onClick: PropTypes.func
};
