import React, {
  Component
} from 'react';

import Cell from './Cell';
import boardCreation from './boardCreation';
import detectionCreation from './detectionCreation';


class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {
      board: boardCreation(props.cstate.column,props.cstate.row,props.cstate.bombs), // array of left click
      detection: detectionCreation(props.cstate.column,props.cstate.row), // array of right click
      end:'play',
      clicked:0
    }
  }
  //left click
   handleClick = (i,j) => {
    if(this.state.end !=='play'){
      return;
    }
     if(this.state.board[i][j]<10  && this.state.detection[i][j]!=='bombDetected'){
      const updatedBoard = this.state.board.slice()
      updatedBoard[i][j] += 10;
      this.setState({
        board:updatedBoard
      });
      this.cellOpener(i,j,this.props.cstate.column,this.props.cstate.row);
    } else if(this.state.board[i][j]==='bomb'){
      this.setState({
        end:'lose'
      });
    }
  }

  handleRightClick = (event,i,j) => {
    event.preventDefault();
    const updatedBoard = this.state.detection.slice();
    if(this.state.end !=='play'){
      return;
    }
    if(this.state.clicked < this.props.cstate.bombs && this.state.detection[i][j]!=='bombDetected'){
      updatedBoard[i][j] = 'bombDetected';
      this.setState({clicked:this.state.clicked+1})
    } else if(this.state.detection[i][j]==='bombDetected'){
      updatedBoard[i][j] ='';
      this.setState({clicked:this.state.clicked-1})
    }
    this.setState({
      detection:updatedBoard
    });
    this.getWinner();
  }

  getWinner = () => {
    var counter=0;
    for(let i=0;i<this.props.cstate.column;i++){
      for(let j=0;j<this.props.cstate.row;j++){
        if(this.state.board[i][j]==='bomb' && this.state.detection[i][j]==='bombDetected'){
          ++counter;
        }
      }
      if(counter===this.props.cstate.bombs){
        this.setState({
          end:'win'
        })
      }
    }
  }

  cellOpener = (i,j,column,rows) => {
    if(this.state.board[i][j]>10 ){
      return;
    }
    //down
    if(i+1<column && this.state.board[i+1][j]===0 ){
      this.handleClick(i+1,j)
    } else if(i+1<column && this.state.board[i+1][j]>0){
      this.handleClick(i+1,j);
    }
    //top
    if(i-1>=0 && this.state.board[i-1][j]===0 ){
      this.handleClick(i-1,j)
    } else if(i-1>=0 && this.state.board[i-1][j]>0 ){
      this.handleClick(i-1,j);
    }
    //left
    if(j-1>=0 && this.state.board[i][j-1]===0){
      this.handleClick(i,j-1)
    } else if(j-1>=0 && this.state.board[i][j-1]>0){
      this.handleClick(i,j-1);
    }
    //right
    if(j+1<rows && this.state.board[i][j+1]===0){
      this.handleClick(i,j+1)
    } else if(j+1<rows && this.state.board[i][j+1]>0){
      this.handleClick(i,j+1);
    }
    //up-right
    if(j+1<rows && i-1>=0 && this.state.board[i-1][j+1]===0){
      this.handleClick(i-1,j+1)
    } else if(j+1<rows && i-1>=0 && this.state.board[i-1][j+1]>0 ){
      this.handleClick(i-1,j+1);
    }
    //up-left
    if(j-1>=0 && i-1>=0 && this.state.board[i-1][j-1]===0){
      this.handleClick(i-1,j-1)
    } else if(j-1>=0 && i-1>=0 && this.state.board[i-1][j-1]>0 ){
      this.handleClick(i-1,j-1);
    }
    //down-right
    if(j+1<rows && i+1<column && this.state.board[i+1][j+1]===0){
      this.handleClick(i+1,j+1)
    } else if(j+1<rows && i+1<column && this.state.board[i+1][j+1]>0 ){
      this.handleClick(i+1,j+1);
    }
    //down-left
    if(j-1>=0 && i+1<column && this.state.board[i+1][j-1]===0){
      this.handleClick(i+1,j-1)
    } else if(j-1>=0 && i+1<column && this.state.board[i+1][j-1]>0 ){
      this.handleClick(i+1,j-1);
    }
  }

  renderCell(i,j){   
  return <Cell 
    value={this.state.board[i][j]}
    detectionValue={this.state.detection[i][j]}
    key={j}
    onClick={() => this.handleClick(i,j)} 
    onContextMenu={(event) => this.handleRightClick(event,i,j)}
    bombs = {bombChecker(this.state.board,i,j,this.props.cstate.column,this.props.cstate.row)}
    isEnd = {this.state.end}
    />
  }
  //calculate amout of bomb in every cell
  componentDidMount() {
    for (let i = 0; i < this.props.cstate.column; i++) {
      for (let j = 0; j < this.props.cstate.row; j++) {
        const updatedBoard = this.state.board.slice()
        if (updatedBoard[i][j] !== 'bomb') {
          updatedBoard[i][j] = bombChecker(this.state.board,i,j,this.props.cstate.column,this.props.cstate.row);
          this.setState({
            board: updatedBoard
          })
        }
      }
    }
  }

  render() {
    //consts
    const grid = [];
    var flagAmount = this.props.cstate.bombs - this.state.clicked;
    var isWin = this.state.end === 'win' ? 'Win' : 'Lose';

    var classWin = 'gameWin';
    if(this.state.end==='win' || this.state.end==='lose'){
      classWin+= ' displayWin';
    }
    //create grid
    for(let i=0;i<this.props.cstate.column;i++){
      const row = [];
      for(let j=0;j<this.props.cstate.row;j++){
        row.push(this.renderCell(i,j));
      }
      grid.push(<div className="boardRow" key={i}>{row}</div>);
    }
    return ( 
      <div>
        <div className={classWin}>You {isWin}</div>
        <div className='flagAmount'><div className="cell bombDetected"></div> - {flagAmount}</div>
        {grid}
      </div>
    );
  }
}

  const bombChecker = (array,i,j,columns,rows) => {
    let bombCounter = 0;
    if(i+1<columns && i-1>=0 && j+1<rows && j-1>=0){
      if(array[i][j+1] === 'bomb')
        bombCounter++;
      if(array[i][j-1] === 'bomb' )
        bombCounter++;
      if(array[i+1][j] === 'bomb')
        bombCounter++;
      if(array[i-1][j] === 'bomb')
        bombCounter++;
      if(array[i+1][j-1] === 'bomb')
        bombCounter++;
      if(array[i+1][j+1] === 'bomb')
        bombCounter++;
      if(array[i-1][j+1] === 'bomb')
        bombCounter++;
      if(array[i-1][j-1] === 'bomb')
        bombCounter++;
    }
    return bombCounter;
  }


export default Board;