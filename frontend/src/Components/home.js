export default function Root() {
    function create_game() {
        alert('Creer une partie')
        //window.location.href='http://10.4.2.5:3001/api/auth/login'
    }
    return (
      <>
        <h1>Home</h1>
        <button className="btn btn-primary" onClick={()=>create_game()}>Creer une partie</button>
        <table class="table">
            <thead>
                <tr>
                <th scope="col">Pseudo</th>
                <th scope="col">En ligne</th>
                <th scope="col">Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td scope="row">Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                </tr>
                <tr>
                <td scope="row">Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                </tr>
                <tr>
                <td scope="row">Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                </tr>
            </tbody>
        </table>
      </>
    );
  }