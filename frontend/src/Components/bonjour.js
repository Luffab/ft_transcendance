import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import { decrement, increment, incrementByAmount, get_token } from './../redux/reducers/counterSlice';
import { get_token, modify_token } from './../redux/reducers/config';
import { get_my_token_from_document } from '../helpers/functions'




export default function Root({my_ip}) {
  const dispatch = useDispatch();
  const token = useSelector(get_token);
  const [incrementAmount, setIncrementAmount] = useState('2');
  return (
    <div>
      <div>
        <p >TOKEN REDUX:[{token}]</p>
        <br/>
        <br/>
        <p >{document.cookie}</p>
        <p >{document.cookie.split(';')[1]}</p>
        <p >{document.cookie.split(';')[1].substring(document.cookie.split(';')[1].indexOf('=')+1)}</p>
        <br/>
      </div>
      <div>
        <button
          onClick={() =>
            dispatch(modify_token(String(get_my_token_from_document('token_transcandence')) || ''))
          }
        >
          dispatch token in Redux
        </button>
      </div>
    </div>
  );
}