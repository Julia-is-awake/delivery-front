import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Produtos from "./pages/Produtos";



function RoutesApp() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Home/> } />
                <Route path="/produtos" element={ <Produtos/> } />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;