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
  const [players, setPlayers] = useState([{id:1, position:0, rollHistory: [], positionHistory:[]}, {id:2, position:0, rollHistory: [], positionHistory:[]}])
  const [currentPlayer, setCurrentPlayer] = useState(0)
  const [consecutiveSixes, setConsecutiveSixes] = useState(0)
  const [playerWins, setPlayerWins] = useState(0)
  const [message, setMessage] = useState(null)

  const handleDiceRoll = (roll) => {
    const updatedPlayers = [...players]
    const player = updatedPlayers[currentPlayer];
    let newPosition = player.position
    setMessage(null)
    if(newPosition===0 && roll !== 6){
      setMessage(`Player ${currentPlayer + 1} needs a six to start`)
      setCurrentPlayer((currentPlayer + 1) % players.length)
      return
    }

    newPosition +=roll;

    newPosition = checkForSnakesAndLadders(newPosition)

    player.rollHistory.push(roll);
    player.positionHistory.push(newPosition>100 ? 100 : newPosition)

    if(newPosition >=100) {
      alert(`Player ${currentPlayer + 1} wins`)
      setPlayerWins(1)
      return;
    }

    const otherPlayerIndex = updatedPlayers.findIndex((player, index) => player.position === newPosition && index !==currentPlayer)

    if(otherPlayerIndex !== -1){
      updatedPlayers[otherPlayerIndex].position=0;
      setMessage(`Player ${updatedPlayers[otherPlayerIndex].id} has been sent back to the start`)
    }

    player.position = newPosition
    if(roll === 6) {
      setConsecutiveSixes(consecutiveSixes+1)

      if(consecutiveSixes+1 === 3) {
        setMessage(`Player ${currentPlayer + 1} rolled the consecutive sixes! Turn ends`)
        setConsecutiveSixes(0);
        setCurrentPlayer((currentPlayer + 1) % players.length)
        setPlayers(updatedPlayers);
        return
      }

      setPlayers(updatedPlayers)
      return
    }
    setConsecutiveSixes(0)
    setPlayers(updatedPlayers)
    setCurrentPlayer((currentPlayer+1) % players.length)
  }
  return (
    <div className="App">
      <h1>Multiplayer Snake and Ladder Game</h1>
      <h5>Message: {message}</h5>
      <Board players={players}/>
      <Dice onRoll={handleDiceRoll}/>
      <p>Current Turn: Player {currentPlayer + 1}</p>
      {playerWins === 1 &&
        <ul>
          { players.map((p, index)=>
            <li key={index}>
              Player {p.id}: scores [{p.rollHistory.join(", ")}], positions [{p.positionHistory.join(", ")}]
            </li>
          )}
        </ul>
      }
    </div>
  );
}

export default App;
