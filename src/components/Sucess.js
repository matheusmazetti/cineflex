import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Sucess(props){
    const { obj } = props;
    const [lugares, setLugares] = React.useState([]);
    const [sessao, setSessao] = React.useState([]);
    
    React.useEffect(() => {
        let sendObj = {
            ids: obj.seats,
            name: obj.name,
            cpf: obj.cpf
        };

        axios.post('https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many', sendObj);
        
    }, []);

    React.useEffect(() => {
        let promisse = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${obj.sessionId}/seats`);
        promisse.then((resposta) => {
            setSessao(resposta.data);
            setLugares(resposta.data.seats)})
    }, [])

    let selected = obj.seatsName;
    console.log(selected);
    
    if(sessao.length === 0){
        return(
            <div>loading ...</div>
        )
    } else {
        return(
            <div className="sucess-content">
                <h1>Pedido feito com sucesso!</h1>
                <div className="sessao">
                    <h1>Filme e sessão</h1>
                    <h2>{sessao.movie.title}</h2>
                    <h2>{`${sessao.day.date} ${sessao.name}`}</h2>
                </div>
                <div className="assentos">
                    <h1>Ingressos</h1>
                    {selected.map((seat) => 
                        <h2>{`Assento ${seat}`}</h2>
                    )}
                </div>
                <div className="comprador">
                    <h1>Comprador</h1>
                    <h2>{`Nome: ${obj.name}`}</h2>
                    <h2>{`CPF: ${obj.cpf}`}</h2>
                </div>
                <Link to="/"><button>Voltar pra home</button></Link>
            </div>
        )
    }
}