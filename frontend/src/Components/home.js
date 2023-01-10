import { useNavigate } from "react-router-dom";

export default function Root({my_ip}) {
  const navigate = useNavigate();
    function create_game() {
        alert('Creer une partie')
        //window.location.href='http://10.4.2.5:3001/api/auth/login'
    }
    return (
      <>
        <h1>Home</h1>
        {/*<!-- Button trigger modal -->*/}
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Creer une partie
        </button>
        <button className="btn btn-primary" onClick={()=>navigate("/update_profil")}>Modifier mon profil {' '}<i class="bi bi-gear-fill"></i></button>
        <button className="btn btn-primary" onClick={()=>navigate("/chat")}>Chat {' '}</button>
        <table class="table">
            <thead>
                <tr>
                <th scope="col">Pseudo</th>
                <th scope="col">Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td scope="row">Mark</td>
                <td><span class="badge text-bg-success">{' '}</span>{' '}En partie (regarder)</td>
                </tr>
                <tr>
                <td scope="row">Mark</td>
                <td><span class="badge text-bg-success">{' '}</span></td>
                </tr>
                <tr>
                <td scope="row">Mark</td>
                <td><span class="badge text-bg-danger">{' '}</span></td>
                </tr>
            </tbody>
        </table>
{/*<!-- Modal -->*/}
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>Type de partie: </p>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
          <label class="form-check-label" for="flexRadioDefault2">
            Joueur random
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
          <label class="form-check-label" for="flexRadioDefault1">
            Inviter un joueur
          </label>
        </div>
        <p>options: </p>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="flexRadioOptions" id="flexRadioOptions2" checked/>
          <label class="form-check-label" for="flexRadioOptions2">
            Thème par default
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="flexRadioOptions" id="flexRadioOptions1"/>
          <label class="form-check-label" for="flexRadioOptions1">
            Thème jungle
          </label>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

      </>
    );
  }