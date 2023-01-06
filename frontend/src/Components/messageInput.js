import { useEffect, useState } from "react"

export default function MessageInput({ send }) {
	const [value, setValue] = useState("")
	return (
		<>
			<input
				onChange={(e)=>setValue(e.target.value)}
				placeholder="Type your message..."
				value={value} />
			<button onClick={() => send(value)}>Send</button>
		</>
	)
}