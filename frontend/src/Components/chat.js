import { useEffect, useState } from "react"
import io, { Socket } from "socket.io-client"
import MessageInput from "./messageInput"
import Messages from "./messages"

export default function Broot() {
	const [socket, setSocket] = useState();
	const [messages, setMessages] = useState([])

	const send = (value) => {
			socket?.emit("message", value)
	}
	useEffect(() => {
			const newSocket = io("http://10.4.1.5:3001")
			setSocket(newSocket)
	}, [setSocket])

	const messageListener = (message) => {
		setMessages([...messages, message])
		console.log(JSON.stringify(messages[0]))
	}
	useEffect(() => {
		socket?.on("message", messageListener)
		return () => {
			socket?.off("message", messageListener)
		}
	}, [messageListener])
    return (
		<>
			{" "}
			<MessageInput send={send}/>
			<Messages messages={messages}/>
    	</>
    );
}