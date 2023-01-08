import { useEffect, useState } from "react"

export default function MessageInput({ sendFunction }) {
	const [messageContent, setValue] = useState("")
	return (
		<>
			<input
				onChange={(e)=>setValue(e.target.value)}
				placeholder="Type your message..."
				messageContent={messageContent} />
			<button onClick={() => sendFunction(messageContent)}>Send</button>
		</>
	)
}