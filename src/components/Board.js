import React, {
  Component
} from 'react';
import Cell from './Cell';


class Board extends Component {
  constructor(props) {
    super(props)

    this.keyCount = 0;
    this.getKey = this.getKey.bind(this);

    this.state = {
      board: [
        [0,0,0,0],
        [0,0,'bomb',0],
        [0,0,0,0],
        [0,0,'bomb',0],
      ]
    }
  }
  getKey() {
    return this.keyCount++;
  }

  handleClick(i,j){
    const updatedBoard = this.state.board.slice();
    updatedBoard[i][j] = 'clicked';
    this.setState({
      board:updatedBoard
    })
    console.log(bombChecker(this.state.board,i,j));
  }

  renderCell(i,j){
    return <Cell 
      value={this.state.board[i][j]}
      key={this.getKey()}
      onClick={()=> this.handleClick(i,j)} 
      />
  }

  render() {
    const grid = [];
    for(let i=0;i<4;i++){
      const row = [];
      for(let j=0;j<4;j++){
        row.push(this.renderCell(i,j));
      }
      grid.push(<div className="boardRow" key={i}>{row}</div>)
    }
    console.log(this.state.board);
    return ( 
      <div>
        {grid}
      </div>
    );
  }
}

const bombChecker = (array,i,j) => {
  var bombCounter=0;
    if((j+1<4 && array[i][j+1]==='bomb') ||  
       (j-1>=0 && array[i][j-1]==='bomb') ||  
       (i+1<4 && array[i+1][j]==='bomb') ||
       (i-1>=0 && array[i-1][j]==='bomb')){
          bombCounter++;
          if((j+1<4 && array[i][j+1]==='bomb') ||  
          (j-1>=0 && array[i][j-1]==='bomb') ||  
          (i+1<4 && array[i+1][j]==='bomb') ||
          (i-1>=0 && array[i-1][j]==='bomb')){
        bombCounter++;
      }
    }
    return bombCounter;
  }



export default Board;