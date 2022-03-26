import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from './Header';
import MainPage from "./MainPage";
import MoviePage from "./MoviePage";
import SeatsPage from "./SeatsPage";


export default function App(){
    return(
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/filme/:filmId" element={<MoviePage />} />
                <Route path="/sessao/:sessaoId" element={<SeatsPage />} />
            </Routes>
        </BrowserRouter>
    )
}