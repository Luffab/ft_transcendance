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

	const sendMessage = (value) => {
		var message = {
			jwt: document.cookie,
			socketId: mySocket.id,
			text: value,
			username: "randomUser"
		}
		mySocket?.emit("messageEmitted", message)
	}
	console.log("document.cookie " + document.cookie)
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