export default function Root() {
    function login() {
        window.location.href='http://10.1.1.1:3001/api/auth/login'
    }
    return (
      <>
        <h1>Bienvenue sur ft_transcendance</h1>
        <button className="btn btn-secondary" onClick={()=>login()}>Se connecter</button>
      </>
    );
  }