import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import {
  Route,
} from "react-router-dom";
import Login from '../pages/Login';

const AuthRoute = ({ component: Component }) => {
	const [loggedIn, setLoggedIn] = useState("")
	const usertoken = sessionStorage.getItem("token");

	useEffect(() => {
		if (usertoken) {
			setLoggedIn(usertoken)
		}
		console.log("usertoken ->", usertoken)
		// eslint-disable-next-line
		
	}, [])
	return (
		<Route exact path="/">
			{loggedIn ? <Redirect to="/" /> : <Login />}
		</Route>
	)
}

export default AuthRoute;
