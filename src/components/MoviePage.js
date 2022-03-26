import { Link, useParams } from "react-router-dom";
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

function Session(props){
    const { date, day, times} = props;
    return(
        <div className="session">
            <h1>{`${day} - ${date}`}</h1>
            <div className="session-buttons">
                {times.map((time) => 
                    <Link to={`/sessao/${time.id}`}><button>{time.name}</button></Link>
                )}
            </div>
        </div>
    )
}


export default function MoviePage(){
    
    const [sections, setSections] = React.useState([]);
    const { filmId } = useParams();
    React.useEffect(() => {
        let promisse = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${filmId}/showtimes`);
        promisse.then((response) => {setSections(response.data)});
    }, []);
    let days = sections.days;
    
    return(
        <>
            <div className="sessions">
                <h1>Selecione o horário</h1>
                {(days === undefined) ? 'loading...':(days.map((day) => <Session date={day.date} day={day.weekday} times={day.showtimes}/>))}
            </div>
            <Footer image={sections.posterURL} name={sections.title}/>
        </>
    )
}