import { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux';
import io from "socket.io-client"
import MessageInput from "./messageInput"
import ShowMessages from "./messages"
import axios from 'axios'
import { get_token } from './../redux/reducers/config';


export default function Broot({socket, my_ip}) {
	const my_token = useSelector(get_token);
	const [mySocket, setSocket] = useState();
	const [messageArray, setMessages] = useState([])
	const [channels, setChannels] = useState([{"channel_name": "1", "nb_unread_msg":3, "last_msg":"Bonjour 1"}])
	const [messages_list, setMessages_list] = useState([{"username": "gmadec", "message":"Bonjour tt le monde"}])
	const [user_selected_to_new_channel, setUser_selected_to_new_channel] = useState(null)
	const [users_added_to_new_channel, setUsers_added_to_new_channel] = useState([])
	//const [all_other_users, setAll_other_users] = useState(["1", "2", "3"])
	const [all_other_users, setAll_other_users] = useState([])
	const [new_channel_name, setNew_channel_name] = useState("")
	const [new_channel_type, setNew_channel_type] = useState("public")
	const [new_channel_password, setNew_channel_password] = useState("")
	const [selected_channel_id, setSelected_channel_id] = useState()

	
	const sendMessage = (value) => {
		var message = {
			jwt: my_token,
			socketId: mySocket.id,
			text: value,
			username: "default",
			chan_id:selected_channel_id
		}
		//console.log("socketId = " + mySocket.id)
		mySocket?.emit("messageEmitted", message)
	}
	useEffect(() => {
		//const newSocket = io("http://10.4.1.5:3001")
		setSocket(socket)
		setChannels([...channels, {"channel_name": "2", "nb_unread_msg":3, "last_msg":"Bonjour 1"}])
		setMessages_list([...messages_list, {"username": "gmadec", "message":"Bonjour tt le monde"}])
		let url='http://'+my_ip+':3001/api/chat/channels?token='+my_token
		//let url='http://10.4.2.5:3001/api/chat/channels?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImdtYWRlYyIsImlzMmZhIjpudWxsLCJmdF9pZCI6IjI5NTg0In0.gU_MV0TkUk7_Pmpl5553hVXquGunWHX-2sX5HbLi4cs'
		axios.get(url)
		.then(res => {
		  console.log(res.data);
		  if (res.data[0])
			  //setUser_selected_to_new_channel(res.data[0].username)
			  //setAll_other_users(res.data)
			  setChannels(res.data)
			  setSelected_channel_id(0)
		})
		.catch((error) => {
			console.log("ERROR: "+error);
			//setUser_selected_to_new_channel(all_other_users[0])
		})
		//setChannels([...channels, {"channel_name": "2", "nb_unread_msg":3, "last_msg":"Bonjour 1"}])
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

		let url='http://'+my_ip+':3001/api/chat/users?token='+my_token
		axios.get(url)
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

	const create_channel = () => {
		let url='http://'+my_ip+':3001/api/chat/create'
		//let url='http://10.4.2.5:3001/api/chat/create'
		let token=my_token
		console.log("COMPLETE COOKIE: [" + document.cookie + "]")
		console.log("TOKEN VAR: [" + token + "]")

		axios.post(url,{
			"token": my_token,
			"channel_name": new_channel_name,
			"channel_type": new_channel_type,
			"password": new_channel_password
		  }
		)
        .then(response => this.setState({ articleId: response.data.id }))
		.catch((error) => {
			console.log("ERROR: "+error);
		})
	}

	const add_user_in_channel = () => {
		let url='http://'+my_ip+':3001/api/chat/add_users'
		//let url='http://10.4.2.5:3001/api/chat/add_users'

		axios.post(url,{
			"token": my_token,
			"channel_name": new_channel_name,
			"channel_type": new_channel_type,
			"password": new_channel_password
		  }
		)
        .then(response => this.setState({ articleId: response.data.id }))
		.catch((error) => {
			console.log("ERROR: "+error);
		})
	}

    return (
		<div className="row">
			<div className="col">
					{
						channels.map((channel, i) => {
							return (
								<div key={i} className="row" onClick={()=> {setSelected_channel_id(channel.id);alert(selected_channel_id)}}>
										<div className="col">
											<div class="card" style={{backgroundColor: selected_channel_id===channel.id ?'blue':'none'}}>
												<div class="card-body">
													<h5 class="card-title">{channel.name}</h5>
													<h6 class="card-subtitle mb-2 text-muted">nb_unread_msg</h6>
													<p class="card-text">last_msg</p>
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
			<div className="col">
				<div className="row">
					<div className="col">
					<button onClick={()=>getAll_other_users()} type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal_add_users_in_channel">
						Ajouter un utilisateur dans ce channel
					</button>
					</div>
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
				{
					selected_channel_id && 
				<div className="row">
					<div className="col">
						<ShowMessages messageArray={messageArray}/>
						<MessageInput sendFunction={sendMessage}/>
					</div>
				</div>
				}
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
							<input class="form-control" type="text" onChange={(e) => {setNew_channel_name(e.target.value)}} placeholder="Default input" aria-label="default input example"></input>
							<p>Type de channel:</p>
							<div class="form-check form-check-inline">
								<input class="form-check-input" onChange={(e) => {setNew_channel_type("public")}} type="radio" name="inlineRadioOptions" id="privateMessageRadio1" value="option1"/>
								<label class="form-check-label" for="privateMessageRadio1">Public</label>
							</div>
							<div class="form-check form-check-inline">
								<input class="form-check-input" onChange={(e) => {setNew_channel_type("private")}} type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"/>
								<label class="form-check-label" for="inlineRadio2">Privé</label>
							</div>
							<div class="form-check form-check-inline">
								<input class="form-check-input" onChange={(e) => {setNew_channel_type("password")}} type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3"/>
								<label class="form-check-label" for="inlineRadio3">Protegé par un mot de passe</label>
							</div>
							{
								new_channel_type === "password" &&
								<>
									<p>Mot de passe:</p>
									<input class="form-control" onChange={(e) => {setNew_channel_password(e.target.value)}} type="text" placeholder="Default input" aria-label="default input example"></input>
								</>
							}
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
							{/*<button type="button" onClick={() => {alert("Channel_name: ["+new_channel_name+ "], new_channel_type: [" + new_channel_type + "], new_channel_password: [" + new_channel_password + "]")}} class="btn btn-primary">Save changes</button>*/}
							<button type="button" onClick={() => create_channel()} class="btn btn-primary">Save changes</button>
						</div>
						</div>
					</div>
				</div>
				{/* Modal add user*/}
				<div class="modal fade" id="modal_add_users_in_channel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div class="modal-dialog">
						<div class="modal-content">
						<div class="modal-header">
							<h1 class="modal-title fs-5" id="exampleModalLabel">Ajouter un user dans le channel {"["}{channels[selected_channel_id] ? channels[selected_channel_id].name : ""}{"]"}</h1>
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
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
							{/*<button type="button" onClick={() => {alert("Channel_name: ["+new_channel_name+ "], new_channel_type: [" + new_channel_type + "], new_channel_password: [" + new_channel_password + "]")}} class="btn btn-primary">Save changes</button>*/}
							<button type="button" onClick={() => create_channel()} class="btn btn-primary">Save changes</button>
						</div>
						</div>
					</div>
				</div>

			</div>
    	</div>
    );
}