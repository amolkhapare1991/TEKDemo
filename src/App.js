import React, {useState} from 'react';
import { Board } from './components/board/board';
import { Dice } from './components/dice/dice';

export const snakeAndLadders = {
  snakes: {
    17: 7,
    54: 34,
    62: 19,
    98: 79
  },
  ladders: {
    3: 22,
    5: 8,
    20: 29,
    27: 1,
    45: 75,
    70: 91,
    79: 99
  }
}

const checkForSnakesAndLadders = (position) => {
    if(snakeAndLadders.snakes.hasOwnProperty(position)){
      return snakeAndLadders.snakes[position]
    }
    if(snakeAndLadders.ladders.hasOwnProperty(position)){
      return snakeAndLadders.ladders[position]
    }

  return position
}

function App() {
  const [players, setPlayers] = useState([{id:1, position:0}, {id:2, position:0}])
  const [currentPlayer, setCurrentPlayer] = useState(0)

  const handleDiceRoll = (roll) => {
    const updatedPlayers = [...players]
    let newPosition = updatedPlayers[currentPlayer].position + roll

    if(newPosition >=100) {
      alert(`Player ${currentPlayer + 1} wins`)

      return;
    }

    newPosition = checkForSnakesAndLadders(newPosition)
    updatedPlayers[currentPlayer].position = newPosition
    setPlayers(updatedPlayers)

    setCurrentPlayer((currentPlayer+1) % players.length)
  }
  return (
    <div className="App">
      <h1>Multiplayer Snake and Ladder Game</h1>
      <Board players={players}/>
      <Dice onRoll={handleDiceRoll}/>
      <p>Current Turn: Player {currentPlayer + 1}</p>

    </div>
  );
}

export default App;
