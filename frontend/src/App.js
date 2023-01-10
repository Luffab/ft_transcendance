import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import io from "socket.io-client"
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
import { useCookies } from 'react-cookie';
import { Routes, Route, Outlet, Link } from "react-router-dom";

const my_ip = "10.4.2.5";
const socket = io(my_ip+':3001', {
  transports: ['websocket'], 
  upgrade: false
});

const [cookies, setCookie] = useCookies(['token_transcandence']);

const router = createBrowserRouter([
	{path: "/",element: <Welcome setCookie={setCookie} cookie={cookies} my_ip={my_ip}/>,},
    {path: "/home",element: <Home my_ip={my_ip} />,},
    {path: "/login",element: <Login my_ip={my_ip} />,},
    {path: "/get_code",element: <Bonjour my_ip={my_ip} />,},
    {path: "/update_profil",element: <Update_profil my_ip={my_ip} />,},
    {path: "/chat",element: <Chat socket={socket} my_ip={my_ip} cookies={cookies}/>,},
    {path: "/stats_and_match_history",element: <Bonjour my_ip={my_ip} />,},
    {path: "/game",element: <Game my_ip={my_ip} />,},
]);

function App() {
  
  return (
    <div className="App">
      <Navbar/>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

/*      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="dashboard" element={<Dashboard />} />

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. *}
                <Route path="*" element={<NoMatch />} />
                </Route>
              </Routes>*/

              //https://github.com/remix-run/react-router/blob/dev/examples/basic/src/App.tsx