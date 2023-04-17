import React, { useState, useEffect} from 'react';
import { createRoot } from 'react-dom/client';

const rowStyle = {
  display: 'flex'
}

const squareStyle = {
  'width':'60px',
  'height':'60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'white'
}

const boardStyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid'
}

const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
}

function Square(props) {
  const [move, setMove] = useState('')

  function handleClick(e) {
    e.preventDefault();
    if ((move == '') & (props.winner == 'None')){ 
        // mark the matrix X or O
        props.setNewGame(false)
        setMove(props.curPlayer);

        // mark the actual dom square X or O
        const newBoard = [...props.board];
        newBoard[props.row][props.col] = props.curPlayer;
        props.setBoard(newBoard);

        // change player
        props.changeCurPlayer();

        // need to decide winner; function executes after every click 
        props.assessWinner();
    }
  }


  useEffect(() =>{
    if (props.newGame == true){
        setMove('');
    }
  }, [props.newGame])


  return (
    <div onClick = {handleClick}
      className="square"
      style={squareStyle}>{move}
    </div>
  );
}

function Board() {
  let matrix = [[null, null, null], [null, null, null], [null, null, null]]; 
  const [curPlayer, setCurPlayer] = useState('X');
  const [board, setBoard] = useState(matrix);
  const [winner, setWinner] = useState('None');
  const [newGame, setNewGame] = useState(true);


  function changeCurPlayer(e){
    if (curPlayer === 'X'){
      setCurPlayer('O');
    } else {
      setCurPlayer('X');
    }
  }


  // need to decide winner; function executes after every click in the square fn comp
  function assessWinner(e) {
    
    // check horiz 3 in row
    for (let i = 0; i < 3; i++){
        if (board[i][0] == board[i][1] && board[i][0] == board[i][2] && board[i][1] != null){
            setWinner(`${board[i][0]} has won!`)
            return 
        }
    }
    // check vert 3 in row
    for (let j = 0; j < 3; j++){
        if (board[0][j] == board[1][j] && board[0][j] == board[2][j] && board[0][j] != null){
            setWinner(`${board[0][j]} has won!`)
            return 
        }
    }
    // check diagonal 3 in row

    if (board[0][0] == board[1][1] && board[0][0] == board[2][2] && board[0][0] != null){
        setWinner(`${board[0][0]} has won!`)
        return 
    }
    if (board[0][2] == board[1][1] && board[0][2] == board[2][2] && board[0][2] != null){
        setWinner(`${board[0][2]} has won!`)
        return 
    }
  }

  // reset board
  function resetBoard(e) {
    e.preventDefault();
    setNewGame(true);
    setCurPlayer('X');
    setWinner('None');
    setBoard(matrix);

  }

  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>Next player: <span>{curPlayer}</span></div>
      <div id="winnerArea" className="winner" style={instructionsStyle}>Winner: <span>{winner}</span></div>
      <button style={buttonStyle} onClick={resetBoard}>Reset</button>
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          <Square curPlayer = {curPlayer} assessWinner={assessWinner} changeCurPlayer={changeCurPlayer} row ={0} col = {0} setBoard={setBoard} board={board} winner={winner} newGame={newGame} setNewGame={setNewGame}/>
          <Square curPlayer = {curPlayer} assessWinner={assessWinner} changeCurPlayer={changeCurPlayer} row ={0} col = {1} setBoard={setBoard} board={board} winner={winner} newGame={newGame} setNewGame={setNewGame}/>
          <Square curPlayer = {curPlayer} assessWinner={assessWinner} changeCurPlayer={changeCurPlayer} row ={0} col = {2} setBoard={setBoard} board={board} winner={winner} newGame={newGame} setNewGame={setNewGame}/>
        </div>
        <div className="board-row" style={rowStyle}>
          <Square curPlayer = {curPlayer} assessWinner={assessWinner} changeCurPlayer={changeCurPlayer} row ={1} col = {0} setBoard={setBoard} board={board} winner={winner} newGame={newGame} setNewGame={setNewGame}/>
          <Square curPlayer = {curPlayer} assessWinner={assessWinner} changeCurPlayer={changeCurPlayer} row ={1} col = {1} setBoard={setBoard} board={board} winner={winner} newGame={newGame} setNewGame={setNewGame}/>
          <Square curPlayer = {curPlayer} assessWinner={assessWinner} changeCurPlayer={changeCurPlayer} row ={1} col = {2} setBoard={setBoard} board={board} winner={winner} newGame={newGame} setNewGame={setNewGame}/>
        </div>
        <div className="board-row" style={rowStyle}>
          <Square curPlayer = {curPlayer} assessWinner={assessWinner} changeCurPlayer={changeCurPlayer} row ={2} col = {0} setBoard={setBoard} board={board} winner={winner} newGame={newGame} setNewGame={setNewGame}/>
          <Square curPlayer = {curPlayer} assessWinner={assessWinner} changeCurPlayer={changeCurPlayer} row ={2} col = {1} setBoard={setBoard} board={board} winner={winner} newGame={newGame} setNewGame={setNewGame}/>
          <Square curPlayer = {curPlayer} assessWinner={assessWinner} changeCurPlayer={changeCurPlayer} row ={2} col = {2} setBoard={setBoard} board={board} winner={winner} newGame={newGame} setNewGame={setNewGame}/>
        </div>
      </div>
    </div>
  );
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

// const container = document.getElementById('root');
// const root = createRoot(container);
// root.render(<Game />);

export {Game}