import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { API } from "../api-service";
import { useCookies } from "react-cookie";

function MovieList(props){

    const [ token ] = useCookies(['mr-token'])

    const movieClicked = movie => e => {
        props.movieClicked(movie)
    }

    const editClicked = movie => {
        props.editClicked(movie)
    }

    const removeClicked = movie => {
        API.deleteMovie(movie.id, token['mr-token'])
            .then( () => props.removeClicked(movie))
            .catch( error => console.log(error))
    }

    return (
        <div className="list-container">
            <h1>Movie List</h1>
            { props?.movies && Array.isArray(props.movies) && props.movies.map( movie => {
                return (
                <div key={movie.id} className="movie-item">
                    <h2 onClick={movieClicked(movie)}>{movie.title}</h2>
                    <FontAwesomeIcon icon={faEdit} onClick={() => editClicked(movie)} title="Edit"/>
                    <FontAwesomeIcon icon={faTrash} onClick={() => removeClicked(movie)} title="Delete"/>
                </div>
                )
            })}
        </div>
    )
}

export default MovieList;