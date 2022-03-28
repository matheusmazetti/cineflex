import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';

import Header from './Header';
import MainPage from "./MainPage";
import MoviePage from "./MoviePage";
import SeatsPage from "./SeatsPage";
import Sucess from "./Sucess";


export default function App(){
    const [obj, setObj] = React.useState({});
    return(
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/filme/:filmId" element={<MoviePage />} />
                <Route path="/sessao/:sessaoId" element={<SeatsPage callback={(sessionId, seats, name, cpf, seatsName) => setObj({
                    sessionId: sessionId,
                    name: name,
                    cpf: cpf,
                    seats: seats,
                    seatsName: seatsName
                })}/>} />
                <Route path="/sucesso" element={<Sucess obj={obj}/>} />
            </Routes>
        </BrowserRouter>
    )
}