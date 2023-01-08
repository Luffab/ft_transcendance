import { Link } from "react-router-dom";

export default function Root() {
	const queryParameters = new URLSearchParams(window.location.search)
    let token = queryParameters.get("jwt");
	document.cookie = "token_transcandence=" + token;
    function login() {
        window.location.href='http://10.4.1.5:3001/api/auth/login'		
    }
    return (
      <>
        <h1>Bienvenue sur ft_transcendance</h1>
        <button className="btn btn-secondary" onClick={()=>login()}>Se connecter</button>
		<Link
  			to={{
  			  pathname: "/chat",
  			  state: token
  			}}
		>link</Link>
      </>
    );
  }