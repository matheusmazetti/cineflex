import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

function Movie(props){
    const { id, image } = props;
    return(
        <div className="movie">
            <Link to={`/filme/${id}`}><img src={image} /></Link>
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
                    <Movie id={element.id} image={element.posterURL}/>
                )}
            </div>
        </section>
    )
}