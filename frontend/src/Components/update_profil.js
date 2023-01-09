export default function Root({my_ip}) {
    return (
      <>
        <h1 style={{textAlign: 'center'}}>Modifier mon profil</h1>
        <label for="input_modify_username" class="form-label">Nom d'utilisateur:</label>
        <div class="input-group mb-3">
            <input id="input_modify_username" type="text" class="form-control" aria-describedby="button_modify_username"/>
            <button class="btn btn-outline-secondary" type="button" id="button_modify_username">Modifier</button>
        </div>
        <p>Photo de profil:</p>
        <img src="https://blog.toploc.com/wp-content/uploads/2020/02/Offrez-vous-un-sejour-a-la-montagne-en-Suisse-et-partez-a-la-decouverte-de-paysages-magnifiques.jpg" class="img-thumbnail" alt="..."></img>
        <div class="mb-3">
            <label for="formFile" class="form-label">Modifier ma photo de profil:</label>
            <input class="form-control" type="file" id="formFile"/>
        </div>
        authentification à deux facteurs: 
        <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
            <label class="form-check-label text-success" for="flexSwitchCheckDefault"><i class="bi bi-check-square-fill"></i></label>
            <label class="form-check-label text-danger" for="flexSwitchCheckDefault"><i class="bi bi-x-square-fill"></i></label>
        </div>

        <p>Liste des joueurs bloqués:</p>
        <ul class="list-group">
            <li class="list-group-item">
                <div class="row">
                    <div class="col">
                        Zidane
                    </div>
                    <div class="col" style={{textAlign: 'center'}}>
                        <button type="button" class="btn btn-danger btn-sm">Débloquer</button>
                    </div>
                </div>
            </li>
            <li class="list-group-item">
                <div class="row">
                    <div class="col">
                        Batman
                    </div>
                    <div class="col" style={{textAlign: 'center'}}>
                        <button type="button" class="btn btn-danger btn-sm">Débloquer</button>
                    </div>
                </div>
            </li>
        </ul>
      </>
    );
  }