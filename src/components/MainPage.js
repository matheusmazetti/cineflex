import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

function Movie(props){
    const { filmId, image } = props;
    return(
        <div className="movie">
            <Link to={`/filme/${filmId}`}><img src={image} /></Link>
        </div>
    )
}

export default function MainPage(){
    const [films, setFilms] = React.useState([]);

    React.useEffect(() => {
        let promisse = axios.get('https://mock-api.driven.com.br/api/v5/cineflex/movies');
        promisse.then((response) => {setFilms(response.data)});
    }, [])
    return(
        <section>
            <h1>Selecione o filme</h1>
            <div className="movies">
                {films.map((element) => 
                    <Movie filmId={element.id} image={element.posterURL}/>
                )}
            </div>
        </section>
    )
}