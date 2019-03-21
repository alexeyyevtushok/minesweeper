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
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
      ],
      detection: [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
      ],
      end:'play'
    }
  }
  getKey() {
    return this.keyCount++;
  }
  
  bombPutter(){
    const updatedBoard = this.state.board.slice();
    updatedBoard[7][0] = 'bomb';
    updatedBoard[6][0] = 'bomb';
    updatedBoard[5][2] = 'bomb';
    updatedBoard[7][4] = 'bomb';
    updatedBoard[2][4] = 'bomb';
    this.setState({
      board:updatedBoard
    })
  }

   handleClick = (i,j) => {
    if(this.state.end !=='play'){
      return;
    }
     if(this.state.board[i][j]<10 ){
      const updatedBoard = this.state.board.slice()
      updatedBoard[i][j] += 10;
      this.setState({
        board:updatedBoard
      });
      this.cellOpener(i,j);
    } else if(this.state.board[i][j]==='bomb'){
      this.setState({
        end:'lose'
      });
    }
  }

  handleRightClick = (event,i,j) => {
    event.preventDefault();
    if(this.state.end !=='play'){
      return;
    }
    if(this.state.detection[i][j]!=='bombDetected'){
    const updatedBoard = this.state.detection.slice()
    updatedBoard[i][j] = 'bombDetected';
    this.setState({
      detection:updatedBoard
    });
    } else if(this.state.detection[i][j]==='bombDetected'){
      const updatedBoard = this.state.detection.slice()
      updatedBoard[i][j] ='';
      this.setState({
        detection:updatedBoard
      });
    }
    this.getWinner();
  }

  getWinner = () => {
    var counter=0;
    for(let i=0;i<8;i++){
      for(let j=0;j<8;j++){
        if(this.state.board[i][j]==='bomb' && this.state.detection[i][j]==='bombDetected'){
          ++counter;
        }
      }
      if(counter===5){
        this.setState({
          end:'win'
        })
      }
    }
  }

  cellOpener = (i,j) => {
    if(this.state.board[i][j]>10 ){
      return;
    }

    //down
    if(i+1<8 && this.state.board[i+1][j]===0 ){
      this.handleClick(i+1,j)
    } else if(i+1<8 && this.state.board[i+1][j]>0){
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
    if(j+1<8 && this.state.board[i][j+1]===0){
      this.handleClick(i,j+1)
    } else if(j+1<8 && this.state.board[i][j+1]>0){
      this.handleClick(i,j+1);
    }
    //up-right
    if(j+1<8 && i-1>=0 && this.state.board[i-1][j+1]===0){
      this.handleClick(i-1,j+1)
    } else if(j+1<8 && i-1>=0 && this.state.board[i-1][j+1]>0 ){
      this.handleClick(i-1,j+1);
    }
    //up-left
    if(j-1>=0 && i-1>=0 && this.state.board[i-1][j-1]===0){
      this.handleClick(i-1,j-1)
    } else if(j-1>=0 && i-1>=0 && this.state.board[i-1][j-1]>0 ){
      this.handleClick(i-1,j-1);
    }
    //down-right
    if(j+1<8 && i+1<8 && this.state.board[i+1][j+1]===0){
      this.handleClick(i+1,j+1)
    } else if(j+1<8 && i+1<8 && this.state.board[i+1][j+1]>0 ){
      this.handleClick(i+1,j+1);
    }
    //down-left
    if(j-1>0 && i+1<8 && this.state.board[i+1][j-1]===0){
      this.handleClick(i+1,j-1)
    } else if(j-1>0 && i+1<8 && this.state.board[i+1][j-1]>0 ){
      this.handleClick(i+1,j-1);
    }
  }

  renderCell(i,j){   
  return <Cell 
    value={this.state.board[i][j]}
    detectionValue={this.state.detection[i][j]}
    key={this.getKey()}
    onClick={() => this.handleClick(i,j)} 
    onContextMenu={(event) => this.handleRightClick(event,i,j)}
    bombs = {bombChecker(this.state.board,i,j)}
    isEnd = {this.state.end}
    />
  }
  
  componentDidMount() {
    this.bombPutter();
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const updatedBoard = this.state.board.slice()
        if (updatedBoard[i][j] !== 'bomb') {
          updatedBoard[i][j] = bombChecker(this.state.board, i, j);
          this.setState({
            board: updatedBoard
          })
        }
      }
    }
  }

  render() {
    console.log(this.state.detection);
    console.log(this.state.board);
    const grid = [];
    for(let i=0;i<8;i++){
      const row = [];
      for(let j=0;j<8;j++){
        row.push(this.renderCell(i,j));
      }
      grid.push(<div className="boardRow" key={i}>{row}</div>);
    }
    return ( 
      <div>
        {grid}
      </div>
    );
  }
}

  const bombChecker = (array,i,j) => {
    let bombCounter = 0;
    if(j+1<8 && (array[i][j+1] === 'bomb' || array[i][j+1] === 'bombDetected'))
      bombCounter++;
    if(j-1>=0 && (array[i][j-1] === 'bomb' || array[i][j-1] === 'bombDetected'))
      bombCounter++;
    if(i+1<8 && (array[i+1][j] === 'bomb' || array[i+1][j] === 'bombDetected'))
      bombCounter++;
    if(i-1>=0 && (array[i-1][j] === 'bomb' || array[i-1][j] === 'bombDetected'))
      bombCounter++;
    if(i+1<8 && j-1>=0 && (array[i+1][j-1] === 'bomb' || array[i+1][j-1] === 'bombDetected'))
      bombCounter++;
    if(i+1<8 && j+1<8 && (array[i+1][j+1] === 'bomb' || array[i+1][j+1] === 'bombDetected'))
      bombCounter++;
    if(i-1>=0 && j+1<8 && (array[i-1][j+1] === 'bomb' || array[i-1][j+1] === 'bombDetected'))
      bombCounter++;
    if(i-1>=0 && j-1>=0 && (array[i-1][j-1] === 'bomb' || array[i-1][j-1] === 'bombDetected'))
      bombCounter++;
    return bombCounter;
  }


export default Board;