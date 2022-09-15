import React from 'react';
import './App.css';

function	App()
{
	// const body = document.querySelector("body");
	// const h1 = document.querySelectorAll("h1");

	// h1.foreach(el => {
	// 	el.addEventListener("mouseover", () => {
	// 		let bg = el.getAttribute("data-bg");
	// 		body.style.background = '${bg}';
	// 	});
	// });
	return (
		<React.Fragment>
			<div className="App">
				<h1 data-bg="adff2f">TRANSCENDANCE</h1>
			</div>
			<div className="Content">
				<h1>PLAY</h1>
			</div>
		</React.Fragment>
	);
}

export default App;
