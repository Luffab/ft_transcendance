import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import { decrement, increment, incrementByAmount, get_token } from './../redux/reducers/counterSlice';
import { get_token, modify_token } from './../redux/reducers/config';
import styles from './../redux/reducers/Counter.module.css';



export default function Root({my_ip}) {
  const token = useSelector(get_token);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');
  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <span className={styles.value}>{token}</span>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={e => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() =>
            dispatch(modify_token(String(document.cookie.substring(document.cookie.indexOf('=')+1)) || ''))
          }
        >
          Add Amount
        </button>
      </div>
    </div>
  );
  }