import { useParams } from "react-router-dom";

export default function MoviePage(){
    const { filmId } = useParams();
    return(
        <>
        <div>{filmId}</div>
        <div>{filmId}</div>
        <div>{filmId}</div>
        <div>{filmId}</div>
        <div>{filmId}</div>
        <div>{filmId}</div>
        <div>{filmId}</div>
        <div>{filmId}</div>
        <div>{filmId}</div>
        <div>{filmId}</div>
        <div>{filmId}</div>
        <div>{filmId}</div>
        <div>{filmId}</div>
        </>
    )
}