import {useParams, redirect, Navigate} from "react-router-dom";



export default function Root() {
    //let { code } = useParams();

    const queryParameters = new URLSearchParams(window.location.search)
    let code = queryParameters.get("code")
    let response_type = queryParameters.get("response_type")
    

    if (code === null && response_type === null)
        //return redirect("/login");
        //return <Navigate replace to="https://www.google.com" />
        window.location.href='https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-d119bf510c7b748d6cea73576d2e8984f85af7f05cbff0e651acea0134950c04&redirect_uri=http%3A%2F%2F10.4.2.5%3A3000%2Fget_code&response_type=code'
    else
        return (
        <>
            <h1>Bonjousrq2waq</h1>
            <p>Code: {code}</p>
            <p>Response_type: {response_type}</p>
        </>
        );
  }