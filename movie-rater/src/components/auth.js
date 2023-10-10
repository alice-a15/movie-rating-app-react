import React, { useEffect, useState } from "react";
import { API } from "../api-service";
import { useCookies } from 'react-cookie';

function Auth() {

	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');

	const [ token, setToken ] = useCookies(['mr-token'])

	useEffect( () => {
		console.log(token);
		if(token['mr-token']) window.location.href = '/movies';
	}, [token])

	const loginClicked = () => {
		API.loginUser({username, password})
			.then( resp => setToken('mr-token', resp.token))
			.catch(error => console.log(error))
	}

	const handleKeyUp = e => {
		if (e.key === 'Enter') {
			loginClicked();
		}
	}

	return (
		<div>
			<label htmlFor="username">Username</label>
			<br />
			<input 
				id="username" 
				type="text" 
				placeholder="username" 
				value={username}
				onChange={ evt => setUsername(evt.target.value)} />
			<br />
			<label htmlFor="password">Password</label>
			<br />
			<input 
				id="password" 
				type="password" 
				placeholder="password" 
				value={password}
				onChange={ evt => setPassword(evt.target.value)} 
				onKeyUp={handleKeyUp} />
			<br/>
			<button type="submit" onClick={loginClicked}>Login</button>
		</div>
	)
}

export default Auth;