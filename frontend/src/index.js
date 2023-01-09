/*import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import io from "socket.io-client"
/* existing imports */
import Welcome from "./Components/welcome";
import Login from "./Components/login";
import Home from "./Components/home";
import Bonjour from "./Components/bonjour";
import Game from "./Components/game";
import Update_profil from "./Components/update_profil";
import Settings from "./Components/settings";
import Chat from "./Components/chat";

const socket = io('http://10.4.1.5:3001', {
  transports: ['websocket'], 
  upgrade: false
});
console.log("socket = " + socket.id)
socket?.emit("onConnection", document.cookie, socket.id)

const router = createBrowserRouter([
	{path: "/",element: <Welcome />,},
    {path: "/home",element: <Home />,},
    {path: "/login",element: <Login />,},
    {path: "/get_code",element: <Bonjour />,},
    {path: "/update_profil",element: <Update_profil />,},
    {path: "/chat",element: <Chat socket={socket}/>,},
    {path: "/stats_and_match_history",element: <Bonjour />,},
    {path: "/game",element: <Game />,},
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/*<Provider store={store}>*/}
      <RouterProvider router={router} />
    {/*</Provider>*/}
  </React.StrictMode>
);