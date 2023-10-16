import React, { useState, useEffect } from "react";
import { API } from "../api-service";
import { useCookies } from "react-cookie";

function MovieForm(props) {

	const [ title, setTitle ] = useState('');
	const [ description, setDescription ] = useState('');
	const [ token ] = useCookies(['mr-token'])

	useEffect( () => {
		setTitle(props.movie.title)
		setDescription(props.movie.description)
	}, [props.movie])

	const updateClicked = () => {
		API.updateMovie(props.movie.id, {title: title, description: description}, token['mr-token'])
			.then( resp => {
				props.updatedMovie(resp)
			})
			.catch( error => console.log(error))
	}
	
	const createClicked = () => {
		API.createMovie({title: title, description: description}, token['mr-token'])
		.then( resp => props.movieCreated(resp))
		.catch( error => console.log(error))
	}

	const isDisabled = title.length === 0 || description.length === 0;

	return (
		<React.Fragment>
			<div className="form-container">
				{ props.movie.id ? 
					<>
						<h1>Edit Movie</h1>
						<br/>
						<div className="edit-movie-box">
							<input 
								id="title" 
								type="text" 
								value={title}
								onChange={ evt => setTitle(evt.target.value)} />
							<label htmlFor="title">Title</label><br/>
						</div>
						<br/>
						<div className="edit-movie-box">
							<textarea 
								id="description" 
								type="text" 
								value={description}
								onChange={ evt => setDescription(evt.target.value)}
							></textarea>
							<label htmlFor="description">Description</label>
						</div>
						<br/><br/>
						<button 
							className="btn"
							onClick={() => {
								updateClicked()
							}}
							disabled={isDisabled}
							style={{
								border:"1px solid #E9C46A", 
								borderRadius:"10px"
							}}
						>Update</button>
					</>
					:
					<>
						<h1>Create A Movie</h1>
						<br/>
						<div className="new-movie-box">
							<input 
								id="title" 
								type="text"
								value={title}
								required=""
								onChange={ evt => setTitle(evt.target.value)} />
							<label htmlFor="title">Title</label>
						</div>
						<br/>
						<div className="new-movie-box">
							<textarea 
								id="description" 
								type="text" 
								value={description}
								required=""
								onChange={ evt => setDescription(evt.target.value)}
							></textarea> 
							<label htmlFor="description">Description</label>
						</div>
						<br/><br/>
						<button 
							className="btn"
							onClick={createClicked} 
							disabled={isDisabled}
							style={{
								border:"1px solid #E9C46A", 
								borderRadius:"10px"
							}}
						>Create</button>
					</>
				}
			</div>
		</React.Fragment> 
	)
}

export default MovieForm;
