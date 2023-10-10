const TOKEN = "37f24b843df39714028a7840cc88b495684152a4"

export class API {
	static updateMovie(mov_id, body) {
		return fetch(`http://127.0.0.1:8000/api/movies/${mov_id}/`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${TOKEN}`
    		},
            body: JSON.stringify(body)
		})
		.then( reps => reps.json())
	}
}