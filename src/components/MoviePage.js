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

function Session(props){
    const { date, day, times} = props;
    console.log(times);
    return(
        <div className="session">
            <h1>{`${day} - ${date}`}</h1>
            <div className="session-buttons">
                {times.map((time) => 
                    <button>{time.name}</button>
                )}
            </div>
        </div>
    )
}

function Sessions(props){
    const { days } = props;
    return(
        <div className="sessions">
                {days.map((day) => 
                    <Session date={day.days.date} day={day.days.weekday} times={day.days.showtimes}/>
                )}
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
    return(
        <>
            {(sections === [])?'loading':<Sessions days={sections} />}
            <Footer image={sections.posterURL} name={sections.title}/>
        </>
    )
}