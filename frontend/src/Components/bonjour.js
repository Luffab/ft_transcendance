import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import { decrement, increment, incrementByAmount, get_token } from './../redux/reducers/counterSlice';
import { get_token, modify_token } from './../redux/reducers/config';




export default function Root({my_ip}) {
  const token = useSelector(get_token);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');
  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <br/>
        <p >TOKEN REDUX:[{token}]</p>
        <br/>
        <br/>
        <p >{document.cookie}</p>
        <p >{document.cookie.split(';')[1]}</p>
        <p >{document.cookie.split(';')[1].substring(document.cookie.split(';')[1].indexOf('=')+1)}</p>
        <br/>
      </div>
      <div>
        <input
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={e => setIncrementAmount(e.target.value)}
        />
        <button
          onClick={() =>
            dispatch(modify_token(String(document.cookie.split(';')[1].substring(document.cookie.split(';')[1].indexOf('=')+1)) || ''))
          }
        >
          Add Amount
        </button>
      </div>
    </div>
  );
  }