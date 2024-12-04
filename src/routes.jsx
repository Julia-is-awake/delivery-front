import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Produtos from "./pages/Produtos";
import Restaurantes from "./pages/Restaurantes";
import Users from "./pages/User";



function RoutesApp() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Home/> } />
                <Route path="/produtos" element={ <Produtos/> } />
                <Route path="/restaurantes" element={ <Restaurantes/> } />
                <Route path="/users" element={ <Users/> } />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;