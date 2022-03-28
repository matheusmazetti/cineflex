import { Link, useNavigate, useParams } from "react-router-dom";
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

function Seat(props){
    const { number, isAvailable, id, callback } = props;
    const [available, setAvailable] = React.useState(false);
    const [selected, setSelected] = React.useState(false);
    const [click, setClick] = React.useState(false);

    React.useEffect(() => {setAvailable(isAvailable)},[])
    return(
        <div className={`seat ${!available ? 'disable':''} ${selected && click ? 'selected': ''}`} onClick={() => {
            if(available){
                if(!click){
                    setSelected(true)
                    setClick(true)
                    callback(id, 1, number)
                } else {
                    setClick(false)
                    callback(id, 0, number)
                }
        }}}>{number}</div>
    )
}

function Seats(props){
    const { seatsObj, callback } = props;
    return(
        <div className="seats">
            {seatsObj.map((seat) => 
                <Seat number={seat.name} isAvailable={seat.isAvailable} id={seat.id} callback={callback}/>
            )}
        </div>
    )
}



export default function SeatsPage(props){
    const { callback } = props;
    const { sessaoId } = useParams();
    const [obj, setObj] = React.useState([]);
    const [name, setName] = React.useState('');
    const [cpf, setCpf] = React.useState('');
    const [seats, setSeats] = React.useState([]);
    const [sName, setSName] = React.useState([]);
    console.log(seats);
    console.log(sName);
    React.useEffect(() => {
        let promisse = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sessaoId}/seats`);
        promisse.then((response) => {setObj(response.data)});
    }, []);
    if(obj.length === 0){
        return(
            <>
                <h1>loading...</h1>
            </>
        )
    } else {
        return(
            <>
                <div className="content">
                    <h1>Selecione o(s) assento(s)</h1>
                    <Seats seatsObj={obj.seats} callback={(id, code, lugar) => {
                    if(code === 1){
                        setSeats([...seats, id])
                        setSName([...sName, lugar])
                    } else if(code === 0) {
                        let index = seats.indexOf(id);

                        seats.splice(index, 1);
                        sName.splice(index, 1);
                    }
                }}/>
                    <div className="menu">
                        <div className="item">
                            <div className="item1"></div>
                            <h1>Selecionado</h1>
                        </div>
                        <div className="item">
                            <div className="item2"></div>
                            <h1>Disponível</h1>
                        </div>
                        <div className="item">
                            <div className="item3"></div>
                            <h1>Indisponível</h1>
                        </div>
                    </div>
                    <label for="name">Nome do comprador:</label>
                    <input type="text" placeholder="Digite o seu nome..." id="name" onChange={(e) => setName(e.target.value)}></input>
                    <label for="cpf">CPF do comprador:</label>
                    <input type="text" placeholder="Digite o seu cpf..." id="cpf" onChange={(e) => setCpf(e.target.value)}></input>
                    <Link to='/sucesso'><button onClick={() => callback(sessaoId, seats, name, cpf, sName)}>Reservar assento(s)</button></Link>
                </div>
                <Footer image={obj.movie.posterURL} name={obj.movie.title} sessionDay={obj.day.weekday} sessionTime={obj.name} />
            </>
        )
    }
}