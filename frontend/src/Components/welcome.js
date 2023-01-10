import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { get_token, modify_token } from './../redux/reducers/config';
import { useEffect, useState } from "react"
import { get_my_token_from_document } from '../helpers/functions'
import { useCookies } from 'react-cookie';




export default function Root({my_ip}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies(['token_transcandence']);

  const my_token = useSelector(get_token);

  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search)
    let token = queryParameters.get("jwt");
    if (token)
    {
      //document.cookie = "token_transcandence=" + token;
      dispatch(modify_token(String(token)))
      setCookie('token_transcandence', token)
      
    }
    if (my_token)
      navigate("/home")

	}, [])
  function login() {
        window.location.href='http://'+my_ip+':3001/api/auth/login'
        //navigate('http://'+my_ip+':3001/api/auth/login')
        //window.location.href='http://10.4.1.7:3001/api/auth/login'
    }
    //const os = require('os');

    //const networkInterfaces = os.networkInterfaces;
    //const ip = networkInterfaces['en0'][0]['address']
    
    return (
      <>
        <h1>Bienvenue sur ft_transcendance</h1>
        <button className="btn btn-secondary" onClick={()=>login()}>Se connecter</button>
        <button className="btn btn-secondary" onClick={()=>navigate("/chat")}>chat</button>
        {
          my_token && <Navigate to="/home" replace={true} />
        }
      </>
    );
}