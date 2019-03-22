import React from 'react';

function Cell(props){
  let playerClass = 'cell';
  //click
  if(props.value !== undefined && typeof(props.value) === 'number' && props.value>=10 ) {
    playerClass += ' clicked';
  }
  //bomb
  if(props.isEnd === 'lose' && props.value ==='bomb') {
    playerClass += ' bomb';
    //detect bomb
  } else if(props.detectionValue ==='bombDetected'){
    playerClass += ' bombDetected';
  }

  let cellValue;
  if(typeof(props.value) === 'number' && props.value>10 && props.detectionValue!=='bombDetected')
    cellValue = props.bombs;

  return(
    <div 
    className={playerClass} 
    onClick={props.onClick}
    onContextMenu={props.onContextMenu}
    >{cellValue}</div>
  );
}

export default Cell;