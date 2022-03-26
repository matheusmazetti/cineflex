import { Link, useParams } from "react-router-dom";
import React from "react";
import axios from "axios";

function Footer(props){
    const { image, name, sessionDay, sessionTime} = props;
    return(
        <div className="footer">
            <div className="background"><img src={image} /></div>
            <div className="footer-info">
                <h1>{name}</h1>
                <h2>{`${sessionDay} - ${sessionTime}`}</h2>
            </div>
        </div>
    )
}


export default function SeatsPage(){
    const { sessaoId } = useParams();
    const [obj, setObj] = React.useState([]);
    
    React.useEffect(() => {
        let promisse = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sessaoId}/seats`);
        promisse.then((response) => {setObj(response.data)});
    }, []);
    console.log(obj);
    if(obj.length === 0){
        return(
            <>
                <h1>loading...</h1>
            </>
        )
    } else {
        return(
            <>
                <Footer image={obj.movie.posterURL} name={obj.movie.title} sessionDay={obj.day.weekday} sessionTime={obj.name} />
            </>
        )
    }
}