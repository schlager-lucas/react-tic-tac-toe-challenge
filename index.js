import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

var gameSize = 3;

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
  
class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    switch (gameSize) {
        case 4:
            return (
                <div>
                  <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                    {this.renderSquare(3)}
                  </div>
                  <div className="board-row">
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                  </div>
                  <div className="board-row">
                    {this.renderSquare(8)}
                    {this.renderSquare(9)}
                    {this.renderSquare(10)}
                    {this.renderSquare(11)}
                  </div>
                  <div className="board-row">
                    {this.renderSquare(12)}
                    {this.renderSquare(13)}
                    {this.renderSquare(14)}
                    {this.renderSquare(15)}
                  </div>
                </div>
            );
        case 5:
            return (
                <div>
                  <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                  </div>
                  <div className="board-row">
                    {this.renderSquare(5)}
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                    {this.renderSquare(9)}
                  </div>
                  <div className="board-row">
                    {this.renderSquare(10)}
                    {this.renderSquare(11)}
                    {this.renderSquare(12)}
                    {this.renderSquare(13)}
                    {this.renderSquare(14)}
                  </div>
                  <div className="board-row">
                    {this.renderSquare(15)}
                    {this.renderSquare(16)}
                    {this.renderSquare(17)}
                    {this.renderSquare(18)}
                    {this.renderSquare(19)}
                  </div>
                  <div className="board-row">
                    {this.renderSquare(20)}
                    {this.renderSquare(21)}
                    {this.renderSquare(22)}
                    {this.renderSquare(23)}
                    {this.renderSquare(24)}
                  </div>
                </div>
            );
        default:
            return (
                <div>
                  <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                  </div>
                  <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                  </div>
                  <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                  </div>
                </div>
            );
    } 
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(gameSize*gameSize).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
      tmp: true,
      tictactoe: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (gameSize > 3) {
        if (calculateWinnerBigFields(squares) || squares[i]) {
            return;
        } 
    } else {
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
    }
    
    if (!this.state.tictactoe) {
      while(this.state.tmp) {
        if (current.squares[i + gameSize] === null) {
          i = i + gameSize;
        } else {
          this.state.tmp = false;
        }
      }
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    

    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      tmp: true,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  setSize(number) {
    gameSize = number;
    this.setState({
      history: [{
          squares: Array(gameSize*gameSize).fill(null),
      }], 
      stepNumber: 0,
      xIsNext: true,
    });
  }

  changeVariety() {
    this.setState({
      history: [{
          squares: Array(gameSize*gameSize).fill(null),
      }], 
      stepNumber: 0,
      xIsNext: true,
      tictactoe: !this.state.tictactoe,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const numbers = [3, 4, 5];
    var winner = null;
    if (gameSize > 3) {
        winner = calculateWinnerBigFields(current.squares);
    } else {
        winner = calculateWinner(current.squares);
    }
    

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    const changeSize = numbers.map((number) => {
        return (
          <li key={number}>
            <button onClick={() => this.setSize(number)}>{number}</button>
          </li>
        );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={i => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <button onClick={() => this.changeVariety()}>{this.state.tictactoe ? 'TicTacToe' : 'Connect Four'}</button>
            <ol>{moves}</ol>
          </div>
          <div className="game-size">
            <div>{'--Change game-size--'}</div>
            <ol>{changeSize}</ol>
          </div>
        </div>
      );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function calculateWinnerBigFields(squares) {
  for (var i = 0; i < squares.length; i++) {
      if ((i % gameSize === 0 || i % gameSize === 1) && i < 2*gameSize) {
        if (checkPosDiag(i, squares)) {
            return squares[i];
        }
      } 
      if ((i % gameSize === gameSize-1 || i % gameSize === gameSize-2) && i < 2*gameSize) {
        if (checkNegDiag(i, squares)) {
            return squares[i];
        }
      } 
      if (i % gameSize === 1 || i % gameSize === 0) {
        if (checkHorizontal(i, squares)) {
            return squares[i];
        }
      }
      if (i < 2*gameSize) {
        if (checkVertical(i, squares)) {
            return squares[i];
        }
      }
  }
  return null;
}

function checkPosDiag(i, squares) {
  if (gameSize == 4) {
      if (squares[i] && squares[i] === squares[gameSize+1+i] && squares[i] === squares[2*gameSize+2+i]) {
          return true;
      }   
  } else {
      if (squares[i] && squares[i] === squares[gameSize+1+i] && squares[i] === squares[2*gameSize+2+i]
           && squares[i] === squares[3*gameSize+3+i]) {
          return true;
      } 
  }
  return false;
}

function checkNegDiag(i, squares) {
  if (gameSize == 4) {
      if (squares[i] && squares[i] === squares[gameSize+i-1] && squares[i] === squares[2*gameSize+i-2]) {
          return true;
      }   
  } else {
      if (squares[i] && squares[i] === squares[gameSize+i-1] && squares[i] === squares[2*gameSize+i-2] 
          && squares[i] === squares[3*gameSize+i-3]) {
          return true;
      } 
  }
  return false;
}

function checkHorizontal(i, squares) {
  if (gameSize == 4) {
    if (squares[i] && squares[i] === squares[i+1] && squares[i] === squares[i+2]) {
      return true;
    }   
  } else {
      if (squares[i] && squares[i] === squares[i+1] && squares[i] === squares[i+2] 
          && squares[i] === squares[i+3]) {
        return true;
      } 
    }
}

function checkVertical(i, squares) {
  if (gameSize == 4) {
    if (squares[i] && squares[i] === squares[i+gameSize] && squares[i] === squares[i+2*gameSize]) {
      return true;
    }
  } else {
      if (squares[i] && squares[i] === squares[i+gameSize] && squares[i] === squares[i+2*gameSize] 
          && squares[i] === squares[i+3*gameSize]) {
          return true;
      } 
  }
  return false;
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);