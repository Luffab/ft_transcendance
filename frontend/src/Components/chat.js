import { useEffect, useState } from "react"
import io from "socket.io-client"
import MessageInput from "./messageInput"
import ShowMessages from "./messages"
import axios from 'axios'

//render() {
//	const { state } = this.props.location
//	return (
//	  // render logic here
//	)
//  }

let tab=["1", "1", "1", "1", "1", "1"]

export default function Broot({socket}) {
	const [mySocket, setSocket] = useState();
	const [messageArray, setMessages] = useState([])
	const [channels, setChannels] = useState([{"channel_name": "1", "nb_unread_msg":3, "last_msg":"Bonjour 1"}])
	const [messages_list, setMessages_list] = useState([{"username": "gmadec", "message":"Bonjour tt le monde"}])
	const [user_selected_to_new_channel, setUser_selected_to_new_channel] = useState(null)
	const [users_added_to_new_channel, setUsers_added_to_new_channel] = useState([])
	//const [all_other_users, setAll_other_users] = useState(["1", "2", "3"])
	const [all_other_users, setAll_other_users] = useState([])

	
	const sendMessage = (value) => {
		var message = {
			jwt: document.cookie,
			socketId: mySocket.id,
			text: value,
			username: "default"
		}
		//console.log("socketId = " + mySocket.id)
		mySocket?.emit("messageEmitted", message)
	}
	useEffect(() => {
		//const newSocket = io("http://10.4.1.5:3001")
		setSocket(socket)
		setChannels([...channels, {"channel_name": "2", "nb_unread_msg":3, "last_msg":"Bonjour 1"}])
		setMessages_list([...messages_list, {"username": "gmadec", "message":"Bonjour tt le monde"}])
	}, [setSocket])

	const messageListener = (newMessage) => {
		setMessages([...messageArray, newMessage])

	}
	useEffect(() => {
		mySocket?.on("messageEmitted", messageListener)
		return () => {
			mySocket?.off("messageEmitted", messageListener)
		}
	}, [messageListener])

	const getAll_other_users = () => {
		//setMessages([...messageArray, newMessage])
		//console.log("ALL OTHER USERS ARE: "+all_other_users)
		//console.log("COOKIE IS: "+document.cookie)
		//let url='http://10.4.2.5:3001/api/chat/users?token='+document.cookie
		let url='http://10.4.1.5:3001/api/chat/users?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImdtYWRlYyJ9.6VGR74ngyseMVgWBIowXFRUrUPBPEiWNcIX5_FEqTrw'
		//let url='http://127.0.0.1:3001/api/chat/users?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImdtYWRlYyJ9.6VGR74ngyseMVgWBIowXFRUrUPBPEiWNcIX5_FEqTrw'
		//let url='http://10.4.1.7:3001/api/chat/users?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImdtYWRlYyJ9.6VGR74ngyseMVgWBIowXFRUrUPBPEiWNcIX5_FEqTrw'
		//let url='http://0.0.0.0:3001/api/chat/users?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImdtYWRlYyJ9.6VGR74ngyseMVgWBIowXFRUrUPBPEiWNcIX5_FEqTrw'
		//let url='http://localhost:3001/api/chat/users?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImdtYWRlYyJ9.6VGR74ngyseMVgWBIowXFRUrUPBPEiWNcIX5_FEqTrw'
		//console.log("URL IS: "+url)
		axios.get(url)
		//axios.get(`http://10.4.2.5:3001/api/chat/users?token=`+document.cookie)
		.then(res => {
		  console.log(res.data);
		  if (res.data[0])
			  setUser_selected_to_new_channel(res.data[0].username)
			  setAll_other_users(res.data)
		})
		.catch((error) => {
			console.log("ERROR: "+error);
			//setUser_selected_to_new_channel(all_other_users[0])
		})
		console.log("ALL OTHER USERS ARE: "+all_other_users)
	}
    return (
		<div className="row">
			<div className="col">
					{
						channels.map((channel, i) => {
							return (
								<div key={i} className="row">
										<div className="col">
											<div class="card" style={{"width": "18rem"}}>
												<div class="card-body">
													<h5 class="card-title">{channel.channel_name}</h5>
													<h6 class="card-subtitle mb-2 text-muted">{channel.nb_unread_msg}</h6>
													<p class="card-text">{channel.last_msg}</p>
												</div>
											</div>
										</div>
									</div>
								)
						 })
					}
			</div>
			<div className="col">
				<div className="row">
					<div className="col">
					<button onClick={()=>getAll_other_users()} type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal_create_channel">
						Creer un channel
					</button>
					</div>
				</div>
				{
					messages_list.map((message_list, i) => {
						return (
							<div className="row">
								<div className="col">
									<div class="card">
										<div class="card-body">
											<h5 class="card-title">username</h5>
											<p class="card-text">message</p>
										</div>
									</div>
								</div>
							</div>
						)
					})
				}
				<div className="row">
					<div className="col">
						<MessageInput sendFunction={sendMessage}/>
						<ShowMessages messageArray={messageArray}/>
					</div>
				</div>
				{/* Modal */}
				<div class="modal fade" id="modal_create_channel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div class="modal-dialog">
						<div class="modal-content">
						<div class="modal-header">
							<h1 class="modal-title fs-5" id="exampleModalLabel">Creer un channel</h1>
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div class="modal-body">
							Selectionner un utilisateur:
							<select class="form-select" aria-label="Default select example">
								{
									all_other_users.map((user, i) => {
										return (
											<option selected={i==0?true:false} onClick={()=>{setUser_selected_to_new_channel(user.username)}}value={user.username}>{user.username}</option>
										)
									})
								}
							</select>
							<button type="button" class="btn btn-success" onClick={()=>{setUsers_added_to_new_channel([user_selected_to_new_channel, ...users_added_to_new_channel])}}>Ajouter</button>
							<br/>
							{
								users_added_to_new_channel.map((username, i) => {
									return (
										<div index={i} className="row">
											<div className="col">
												<p class="card-text">√ {username}</p>
											</div>
										</div>
									)
								})
							}
							<p>Nom du channel:</p>
							<input class="form-control" type="text" placeholder="Default input" aria-label="default input example"></input>
							<p>Message direct:</p>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio" name="inlineRadioOptions" id="privateMessageRadio1" value="option1"/>
								<label class="form-check-label" for="privateMessageRadio1">Oui</label>
							</div>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"/>
								<label class="form-check-label" for="inlineRadio2">Non</label>
							</div>
							<p>Message privé:</p>
							<input class="form-control" type="text" placeholder="Default input" aria-label="default input example"></input>
							<p>Mot de passe:</p>
							<input class="form-control" type="text" placeholder="Default input" aria-label="default input example"></input>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
							<button type="button" class="btn btn-primary">Save changes</button>
						</div>
						</div>
					</div>
				</div>

			</div>
    	</div>
    );
}