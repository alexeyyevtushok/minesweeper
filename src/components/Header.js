import React from 'react';
import PropTypes from 'prop-types';

function Header({ onClicked, cstate }) {
  return (
    <div className="gameHeader">
      <h1>Minesweeper game</h1>
      <button type="button" onClick={onClicked}>{!cstate ? 'Play' : 'Stop'}</button>
    </div>
  );
}


Header.propTypes = {
  onClicked: PropTypes.func.isRequired,
  cstate: PropTypes.bool.isRequired,
};

export default Header;
