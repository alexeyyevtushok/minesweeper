/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

function Cell({
  value, isEnd, detectionValue, onClick, onContextMenu, bombs,
}) {
  let playerClass = 'cell';
  // click
  if (value !== undefined && typeof (value) === 'number' && value >= 10) {
    playerClass += ' clicked';
  }
  // bomb
  if (isEnd === 'lose' && value === 'bomb') {
    playerClass += ' bomb';
    // detect bomb
  } else if (detectionValue === 'bombDetected') {
    playerClass += ' bombDetected';
  }

  let cellValue;
  if (typeof (value) === 'number' && value > 10 && detectionValue !== 'bombDetected') { cellValue = bombs; }

  return (
    <div
      className={playerClass}
      onClick={onClick}
      onContextMenu={onContextMenu}
      role="button"
    >
      {cellValue}
    </div>
  );
}

Cell.propTypes = {
  value: PropTypes.number.isRequired,
  isEnd: PropTypes.bool.isRequired,
  detectionValue: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onContextMenu: PropTypes.func.isRequired,
  bombs: PropTypes.number.isRequired,
};


export default Cell;
