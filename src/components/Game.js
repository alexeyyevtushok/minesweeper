import React, { Component } from "react";

import Header from "./Header";
import Board from "./Board";

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      game: false,
      column: 10,
      row: 10,
      bombs: 10
    };
  }
  gameChanger = () => {
    if (this.state.game) {
      this.setState({
        game: !this.state.game,
        column: 10,
        row: 10,
        bombs: 10
      });
    }
    this.setState({
      game: !this.state.game
    });
  };
  //grid size
  handleOptionChange = event => {
    switch (event.target.value) {
      case "Easy":
        this.setState({
          column: 8,
          row: 8,
          bombs: 5
        });
        break;
      case "Hard":
        this.setState({
          column: 16,
          row: 16,
          bombs: 40
        });
        break;
      case "Impossible":
        this.setState({
          column: 16,
          row: 32,
          bombs: 99
        });
        break;
      default:
        this.setState({
          column: 10,
          row: 10,
          bombs: 10
        });
    }
  };

  addInput(option) {
    var k;
    k++;
    const lablels = [];
    lablels.push(
      <label key={k}>
        <input
          className="option-input radio"
          type="radio"
          name="config"
          value={option}
          onChange={this.handleOptionChange}
        />
        {option}
      </label>
    );
    return lablels;
  }
  render() {
    console.log(this.state);
    if (this.state.game) {
      return (
        <div className="main">
          <Header onClicked={this.gameChanger} cstate={this.state.game} />
          <Board cstate={this.state} />
        </div>
      );
    }
    return (
      <div className="main">
        <Header onClicked={this.gameChanger} cstate={this.state.game} />
        <form className="gameEnd">
          <p>Default: Normal</p>
          <hr />
          <div className="gameEndLabel">Choose game style: </div>
          {this.addInput("Easy")}
          {this.addInput("Hard")}
          {this.addInput("Impossible")}
        </form>
      </div>
    );
  }
}

export default Game;
