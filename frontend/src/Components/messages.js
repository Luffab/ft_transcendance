import { useEffect, useState } from "react"

export default function Messages({messages}) {
	return (
		<div>
			{messages.map((message, index) => (
				<div key={index}>MESSAGE: {JSON.stringify(message)}</div>
			))}
		</div>
	)
}