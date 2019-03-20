import React, {Component} from 'react';

import Header from './Header';
import Board from './Board';

class Game extends Component {
  render(){
    return(
      <div className="main">
        <Header/>
        <Board />
      </div>
    );
  }
}

export default Game;