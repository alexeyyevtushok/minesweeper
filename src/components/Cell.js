import React from 'react';

function Cell(props){
  let playerClass = 'cell';
  if(props.value !== undefined && props.value === 'clicked') {
    playerClass += ' clicked';
  }
  if(props.value !== undefined && props.value === 'bomb') {
    playerClass += ' bomb';
  }
  return(
    <div 
    className={playerClass} 
    onClick={props.onClick}
    ></div>
  );
}

export default Cell;