import React, {useState} from 'react';
import styles from './Dice.module.css'

export const Dice = ({onRoll}) => {
 const [roll, setRoll] = useState(null)

 const rollDice = () => {
    const newRoll = Math.floor(Math.random()*6) + 1;
    setRoll(newRoll)
    onRoll(newRoll)
 }

 return(
    <div className={styles.dice}>
        <button onClick={rollDice}>Roll Dice</button>
        {roll && <p>Rolled:{roll}</p>}
    </div>
 )
}