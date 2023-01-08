import { useEffect, useState } from "react"
import io from "socket.io-client"
import MessageInput from "./messageInput"
import ShowMessages from "./messages"

//render() {
//	const { state } = this.props.location
//	return (
//	  // render logic here
//	)
//  }

export default function Broot() {
	const [mySocket, setSocket] = useState();
	const [messageArray, setMessages] = useState([])
	//const newSocket = io("http://10.4.1.5:3001")
	//setSocket(newSocket)

	const sendMessage = (value) => {
		var message = {
			jwt: document.cookie,
			socketId: mySocket.id,
			text: value,
			username: "default"
		}
		console.log("socketId = " + mySocket.id)
		mySocket?.emit("messageEmitted", message)
	}
	useEffect(() => {
			const newSocket = io("http://10.4.1.5:3001")
			setSocket(newSocket)
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
    return (
		<>
			{" "}
			<MessageInput sendFunction={sendMessage}/>
			<ShowMessages messageArray={messageArray}/>
    	</>
    );
}