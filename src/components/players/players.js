import React from 'react';
import styles from './Players.module.css'

export const Players = ({numPlayers, setNumPlayers, startGame}) => {

 
 return(
    <div className={styles.wrapper}>
        <h3>Select Number of Players (1-5)</h3>
        <input type="number" min="1" max="5" value={numPlayers} onChange={(e)=>setNumPlayers(parseInt(e.target.value, 10))}/>
        <button onClick={startGame}>Start Game</button>
    </div>
 )
}