import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from './Header';
import MainPage from "./MainPage";

export default function App(){
    return(
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/filme/:filmId" element={<Header />} />
                <Route path="/sessao/:sessaoId" element={<Header />} />
            </Routes>
        </BrowserRouter>
    )
}