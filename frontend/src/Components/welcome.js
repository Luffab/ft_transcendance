import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Root({my_ip}) {
  const navigate = useNavigate();
	const queryParameters = new URLSearchParams(window.location.search)
    let token = queryParameters.get("jwt");
	  document.cookie = "token_transcandence=" + token;
    function login() {
        window.location.href='http://'+my_ip+':3001/api/auth/login'
        //window.location.href='http://10.4.1.7:3001/api/auth/login'
    }
    //const os = require('os');

    //const networkInterfaces = os.networkInterfaces;
    //const ip = networkInterfaces['en0'][0]['address']
    
    return (
      <>
        <h1>Bienvenue sur ft_transcendance</h1>
        <button className="btn btn-secondary" onClick={()=>login()}>Se connecter</button>
		<Link
  			to={{
  			  pathname: "/chat",
  			  state: token
  			}}
		>Chat</Link>
    <button className="btn btn-secondary" onClick={()=>navigate("/chat")}> {'CHAT WITH USENAVIGATE'}</button>
      </>
    );
  }