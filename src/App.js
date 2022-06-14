// import { useSelector, useDispatch } from 'react-redux'
// import { toggleColor } from './redux/Actions/todos';
import React from "react";
import Routes from "./Routes/index";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

  export default function App() {
    if (process.env.NODE_ENV !== "development"){
    console.log = () => {};}
    return (
        <div>
          <Routes />
        </div>
    );
  }
