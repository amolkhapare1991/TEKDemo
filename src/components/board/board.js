import React from 'react';
import styles from './Board.module.css'
import { snakeAndLadders } from '../../App';

  export const Board = ({players}) => {
        const renderSquare = (index) => {
            const playerOnSquare = players.find(player => player.position === index )
            const isSnakeOrLadder = snakeAndLadders.snakes.hasOwnProperty(index) || snakeAndLadders.ladders.hasOwnProperty(index)
            console.log(111, playerOnSquare)
            return(
                <div className={`${styles.square} ${isSnakeOrLadder ? styles.special : ''}`} key={index}>
                    <span>{index}</span>
                    {playerOnSquare && <div className={`${styles.player} ${styles.player-playerOnSquare.id}`}>P{playerOnSquare.id}</div>}
                </div>
            )
        }

  const squares = [];
  for (let i = 100; i>0; i--){
    squares.push(renderSquare(i))
  }

  return(
    <div className={styles.board}>
        {squares}
    </div>
  )
}