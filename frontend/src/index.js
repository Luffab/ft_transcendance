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
import App from './App'
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
import { Provider } from 'react-redux'
import store from './redux/store'
import Navbar from "./Containers/navbar";
import { CookiesProvider } from 'react-cookie';

const my_ip = "10.4.2.5";
const socket = io(my_ip+':3001', {
  transports: ['websocket'], 
  upgrade: false
});

const router = createBrowserRouter([
	{path: "/",element: <Welcome my_ip={my_ip}/>,},
    {path: "/home",element: <Home my_ip={my_ip} />,},
    {path: "/login",element: <Login my_ip={my_ip} />,},
    {path: "/get_code",element: <Bonjour my_ip={my_ip} />,},
    {path: "/update_profil",element: <Update_profil my_ip={my_ip} />,},
    {path: "/chat",element: <Chat socket={socket} my_ip={my_ip}/>,},
    {path: "/stats_and_match_history",element: <Bonjour my_ip={my_ip} />,},
    {path: "/game",element: <Game my_ip={my_ip} />,},
]);


const root = ReactDOM.createRoot(
  document.getElementById("root")
)

root.render(
  <Provider store={store}>
    <CookiesProvider>
      <App/>
      {/*<Navbar/>
      <RouterProvider router={router} />*/}
    </CookiesProvider>
  </Provider>
);