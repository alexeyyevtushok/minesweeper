/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/sort-comp */
import React, { Component } from 'react';

import Cell from './Cell';
import boardCreation from './boardCreation';
import detectionCreation from './detectionCreation';
import bombChecker from './bombChecker';
import cellOpener from './cellOpener';

class Board extends Component {
  constructor(props) {
    super(props);
    this.column = props.column;
    this.row = props.row;
    this.bombs = props.bombs;
    this.state = {
      board: boardCreation(
        this.column,
        this.row,
        this.bombs,
      ), // array of left click
      detection: detectionCreation(this.column, this.row), // array of right click
      end: 'play',
      clicked: 0,
    };
  }

  // left click
  handleClick = (i, j) => {
    const { end, board, detection } = this.state;
    if (end !== 'play') {
      return;
    }
    if (
      board[i][j] < 10
      && detection[i][j] !== 'bombDetected'
    ) {
      const updatedBoard = board.slice();
      updatedBoard[i][j] += 10;
      this.setState({
        board: updatedBoard,
      });
      cellOpener(
        i,
        j,
        this.column,
        this.row,
        board,
        this.handleClick,
      );
    } else if (board[i][j] === 'bomb') {
      this.setState({
        end: 'lose',
      });
    }
  };

  handleRightClick = (event, i, j) => {
    const { end, detection, clicked } = this.state;
    event.preventDefault();
    const updatedBoard = detection.slice();
    if (end !== 'play') {
      return;
    }
    if (
      clicked < this.bombs
      && detection[i][j] !== 'bombDetected'
    ) {
      updatedBoard[i][j] = 'bombDetected';
      this.setState({ clicked: clicked + 1 });
    } else if (detection[i][j] === 'bombDetected') {
      updatedBoard[i][j] = '';
      this.setState({ clicked: clicked - 1 });
    }
    this.setState({
      detection: updatedBoard,
    });
    this.getWinner();
  };

  getWinner = () => {
    const { board, detection } = this.state;
    let counter = 0;
    for (let i = 0; i < this.column; i += 1) {
      for (let j = 0; j < this.row; j += 1) {
        if (
          board[i][j] === 'bomb'
          && detection[i][j] === 'bombDetected'
        ) {
          counter += 1;
        }
      }
      if (counter === this.bombs) {
        this.setState({
          end: 'win',
        });
      }
    }
  };

  renderCell(i, j) {
    const { end, board, detection } = this.state;
    return (
      <Cell
        value={board[i][j]}
        detectionValue={detection[i][j]}
        key={j}
        onClick={() => this.handleClick(i, j)}
        onContextMenu={event => this.handleRightClick(event, i, j)}
        bombs={bombChecker(
          board,
          i,
          j,
          this.column,
          this.row,
        )}
        isEnd={end}
      />
    );
  }

  // calculate amout of bomb in every cell
  componentDidMount() {
    const { board } = this.state;
    for (let i = 0; i < this.column; i += 1) {
      for (let j = 0; j < this.row; j += 1) {
        const updatedBoard = board.slice();
        if (updatedBoard[i][j] !== 'bomb') {
          updatedBoard[i][j] = bombChecker(
            board,
            i,
            j,
            this.column,
            this.row,
          );
          this.setState({
            board: updatedBoard,
          });
        }
      }
    }
  }

  render() {
    // consts
    const { end, clicked } = this.state;
    const grid = [];
    const flagAmount = this.bombs - clicked;
    const isWin = end === 'win' ? 'Win' : 'Lose';

    let classWin = 'gameWin';
    if (end === 'win' || end === 'lose') {
      classWin += ' displayWin';
    }
    // create grid
    for (let i = 0; i < this.column; i += 1) {
      const row = [];
      for (let j = 0; j < this.row; j += 1) {
        row.push(this.renderCell(i, j));
      }
      grid.push(
        <div className="boardRow" key={i}>
          {row}
        </div>,
      );
    }
    return (
      <div>
        <div className={classWin}>
          You
          {isWin}
        </div>
        <div className="flagAmount">
          <div className="cell bombDetected" />
          -
          {flagAmount}
        </div>
        {grid}
      </div>
    );
  }
}

export default Board;
