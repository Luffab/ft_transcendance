export default function ShowMessage({messageArray}) {
	return (
		<div>
			{messageArray.map((message, index) => (
				<div key={index}>{message.username}: {message.text}</div>
			))}
		</div>
	)
}