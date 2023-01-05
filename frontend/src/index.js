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
import { createBrowserRouter, RouterProvider } from "react-router-dom";
/* existing imports */
import Welcome from "./Components/welcome";
import Login from "./Components/login";
import Home from "./Components/home";
import Bonjour from "./Components/bonjour";
import Settings from "./Components/settings";

const router = createBrowserRouter([
    {path: "/",element: <Welcome />,},
    {path: "/home",element: <Home />,},
    //{path: "/login",element: <Login />,},
    {path: "/get_code",element: <Bonjour />,},
    {path: "/settings",element: <Settings />,},
    {path: "/chat",element: <Bonjour />,},
    {path: "/stats_and_match_history",element: <Bonjour />,},
    {path: "/game",element: <Bonjour />,},
  ]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);