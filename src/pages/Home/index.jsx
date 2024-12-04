import { Link } from "react-router-dom";
import Header from "../../components/header";
import "./home.css";

function Home() {
  return (
    <div>
      <Header />
      <div className="home-body">
        <h1>Bem-vindo!</h1>
        <div
          class="d-block"
        >
          <Link to="/produtos">
            <button type="button" class="btn btn-outline-primary me-3">
              Produtos
            </button>
          </Link>
          <Link to="/restaurantes">
            <button type="button" class="btn btn-outline-primary me-3">
              Restaurantes
            </button>
          </Link>
          <Link to="/users">
            <button type="button" class="btn btn-outline-primary">
              Users
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
