import React, { useEffect, useState } from "react";
import { API } from "../api-service";
import { useCookies } from 'react-cookie';

function Auth() {

	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ confirmPassword, setConfirmPassword ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ isLoginView, setIsLoginView] = useState(true);

	const [ token, setToken ] = useCookies(['mr-token'])

	useEffect( () => {
		if(token['mr-token']) window.location.href = '/movies';
	}, [token])

	const loginClicked = () => {
		if (username && password) {
			API.loginUser({username, password})
				.then( resp => setToken('mr-token', resp.token))
				.catch(error => console.log(error))
		} else {
			console.log("Login Error")
		}
	}

	const handleKeyUp = e => {
		if (e.key === 'Enter') {
			loginClicked();
		}
	}

	const registerClicked = () => {
		if (username && email && password && password === confirmPassword) {
			API.registerUser({username, password})
				.then( () => loginClicked())
				.catch(error => console.log(error))
		} else {
			console.log("Please Check Input")
		}
	}

	const isDisabled = username.length === 0 || password === 0;

	return (
		<div className="App">
			<div className="login-container">
				{ isLoginView ?
					<>
						<h1>Login</h1>
						<br/>
						<div className="user-box">
							<input 
								id="username" 
								type="text"
								value={username}
								required=""
								onChange={ evt => setUsername(evt.target.value)} />
							<label htmlFor="username">Username</label>
						</div>
						<br/><br/>
						<div className="user-box">
							<input 
								id="password" 
								type="password" 
								value={password}
								required=""
								onChange={ evt => setPassword(evt.target.value)} 
								onKeyUp={handleKeyUp} />
							<label htmlFor="password">Password</label>
						</div>
						<br/><br/>
						<button className="btn" type="submit" onClick={loginClicked} disabled={isDisabled}>
							<span></span>
							<span></span>
							<span></span>
							<span></span>
							Login
						</button>
						<p>Don&apos; have an account? <a onClick={() => setIsLoginView(false)} className="a-link">Signup</a></p>
					</>
					:
					<>
						<h1>Signup</h1>
						<br/>
						<div className="user-box">
							<input 
								id="username" 
								type="text" 
								value={username}
								onChange={ evt => setUsername(evt.target.value)} />
							<label htmlFor="username">Username</label><br/>
						</div>
						<br/>
						<div className="user-box">
							<input 
								id="email" 
								type="text"
								value={email}
								onChange={ evt => setEmail(evt.target.value)} />
							<label htmlFor="email">Email</label><br/>
						</div>
						<br/>
						<div className="user-box">
							<input 
								id="password" 
								type="password"
								value={password}
								onChange={ evt => setPassword(evt.target.value)} />
							<label htmlFor="password">Password</label>
						</div>
						<br/>
						<div className="user-box">
							<input 
								id="confirmPassword" 
								type="password"
								value={confirmPassword}
								onChange={ evt => setConfirmPassword(evt.target.value)} 
								onKeyUp={handleKeyUp} />
							<label htmlFor="confirmPassword">Confirm Password</label>
						</div>
						<br/><br/>
						<button className="btn" type="submit" onClick={registerClicked} disabled={isDisabled}>
							<span></span>
							<span></span>
							<span></span>
							<span></span>
							Register
						</button>
						<p>Already have an account? <a onClick={() => setIsLoginView(true)} className="a-link">Login</a></p>
					</>
				}
			</div>
		</div>
	)
}

export default Auth;