import React from 'react';

function Cell(props){
  let playerClass = 'cell';
  if(props.value !== undefined && props.value === 'clicked') {
    playerClass += ' clicked';
  }
  if(props.value !== undefined && props.value === 'bomb') {
    playerClass += ' bomb';
  }

  let cellValue;
  if(props.value === 'clicked' && props.bombs>0)
    cellValue = props.bombs;

  return(
    <div 
    className={playerClass} 
    onClick={props.onClick}
    >{cellValue}</div>
  );
}

export default Cell;