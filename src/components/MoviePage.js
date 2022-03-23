import { useParams } from "react-router-dom";
import React from "react";
import axios from "axios";

function Footer(props){
    const { image, name} = props;
    return(
        <div className="footer">
            <div className="background"><img src={image} /></div>
            <h1>{name}</h1>
        </div>
    )
}



export default function MoviePage(){
    const { filmId } = useParams();
    const [sections, setSections] = React.useState([]);

    React.useEffect(() => {
        let promisse = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${filmId}/showtimes`);
        promisse.then((response) => {setSections(response.data)});
    }, []);
        console.log(sections);
    return(
        <>
            <Footer image={sections.posterURL} name={sections.title}/>
        </>
    )
}