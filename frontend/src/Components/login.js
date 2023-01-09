import {useParams, redirect, Navigate} from "react-router-dom";
import axios from 'axios'


export default function Root({my_ip}) {
    //let { code } = useParams();


    const queryParameters = new URLSearchParams(window.location.search)
    let code = queryParameters.get("code")
	console.log("code = " + code);
    let response_type = queryParameters.get("response_type")
    

    if (code === null && response_type === null)
        //return redirect("/login");
        //return <Navigate replace to="https://www.google.com" />
        window.location.href='https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-5b4307f9a86719c2492d40ee857a339b1d62f267c7920328d2a0795fed3e5f29&redirect_uri=http%3A%2F%2F10.1.1.2%3A3001%2Fapi%2Fauth%2Fredirect&response_type=code'
    else
        return (
        <>
            <h1>Bonjousrq2waq</h1>
            <p>Code: {code}</p>
            <p>Response_type: {response_type}</p>
        </>
        );
  }

  