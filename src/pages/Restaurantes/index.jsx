import { useEffect, useState } from "react";
import Header from "../../components/header";
import "./restaurantes.css";
import api from "../../services/api";

function Restaurantes() {
  const [restaurantes, setRestaurantes] = useState([]);
  const [itemId, setItemId] = useState();

  const [restaurante, setRestaurante] = useState({});

  const [nome, setNome] = useState();
  const [descricao, setDescricao] = useState();
  const [imagem, setImagem] = useState();
  const [nota, setNota] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const rests = await api.get("/restaurante/listar");
      //   console.log(rests.data);
      setRestaurantes(rests.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // console.log(restaurante);
    setItemId(restaurante.id);
    setNome(restaurante.nome);
    setDescricao(restaurante.descricao);
    setImagem(restaurante.imagem);
    setNota(restaurante.nota);
  }, [restaurante]);

  const deleteItem = async () => {
    try {
      const response = await api.delete(`/restaurante/deletar/${itemId}`);
      setRestaurantes(response.data);
      // console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const editItem = async () => {
    const item = {
      id: itemId,
      nome: nome,
      descricao: descricao,
      imagem: imagem,
      nota: nota,
    };

    const response = await api.post(`/restaurante/editar`, item);
    setRestaurantes(response.data);

    cleanInputs();
  };

  const cleanInputs = () => {
    setItemId(0)
    setNome("");
    setDescricao("");
    setImagem("");
    setNota(0);
  };

  const createItem = async () => {
    const item = {
      nome: nome,
      descricao: descricao,
      imagem: imagem,
      nota: nota,
    };

    console.log(item);

    const response = await api.post(`/restaurante/cadastrar`, item);
    setRestaurantes((prevRestaurantes) => [...prevRestaurantes, response.data]);

    cleanInputs();
  };

  const searchItem = async () => {
    const item = await api.get(`/restaurante/${itemId}`);
    setRestaurante(item.data);
  };

  return (
    <div>
      <Header />
      <div className="restaurantes-container">
        <p>
          <button
            className="btn btn-primary"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#restaurantesListar"
            aria-expanded="false"
            aria-controls="restaurantesListar"
          >
            Restaurantes
          </button>
        </p>

        <div className="collapse mb-3" id="restaurantesListar">
          <div className="card card-body d-block">
            <div className="d-flex gap-2">
              <button
                className="btn btn-warning mb-2"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#gerenciar-item"
                aria-expanded="false"
                aria-controls="gerenciar-item"
              >
                Gerenciar
              </button>

              <button
                className="btn btn-success mb-2"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#modalCriar"
              >
                Criar
              </button>

              <div className="d-flex select-by-id">
                <button
                  className="btn btn-secondary mb-2"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#modalLer"
                  onClick={searchItem}
                >
                  Procurar
                </button>
                <input
                  value={itemId}
                  type="number"
                  className="form-control mb-2"
                  placeholder="Digite um id"
                  onChange={(e) => setItemId(e.target.value)}
                ></input>
              </div>
            </div>

            <div
              className="modal fade"
              id="modalLer"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex="-1"
              aria-labelledby="modalLerLabel"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="modalLerLabel">
                      Procurar
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={cleanInputs}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="restaurantes-listar-item">
                      <div
                        className="restaurantes-listar-imagem"
                        style={{ backgroundImage: `url(${restaurante.imagem})` }}
                      ></div>
                      <div className="restaurantes-listar-descricao">
                        <h5>{restaurante.nome}</h5>
                        <p>{restaurante.descricao}</p>
                        <div>
                          <p>Nota: {restaurante.nota}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                      onClick={cleanInputs}
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      className="btn btn-success"
                      data-bs-dismiss="modal"
                      onClick={cleanInputs}
                    >
                      Concluir
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="modal fade"
              id="modalCriar"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex="-1"
              aria-labelledby="modalCriarLabel"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="modalCriarLabel">
                      Criar
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={cleanInputs}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <form className="row g-3">
                      <div className="col-md-10">
                        <label className="form-label">Nome:</label>
                        <input
                          type="name"
                          value={nome}
                          className="form-control"
                          onChange={(e) => setNome(e.target.value)}
                        />
                      </div>
                      <div className="col-md-2">
                        <label className="form-label">Nota:</label>
                        <input
                          type="text"
                          value={nota}
                          className="form-control"
                          onChange={(e) => setNota(e.target.value)}
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label">Descrição:</label>
                        <input
                          type="text"
                          value={descricao}
                          className="form-control"
                          onChange={(e) => setDescricao(e.target.value)}
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label">Imagem:</label>
                        <input
                          type="text"
                          value={imagem}
                          className="form-control"
                          onChange={(e) => setImagem(e.target.value)}
                        />
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                      onClick={cleanInputs}
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      className="btn btn-success"
                      data-bs-dismiss="modal"
                      onClick={createItem}
                    >
                      Concluir
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="modal fade"
              id="modalExcluir"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex="-1"
              aria-labelledby="modalExcluirLabel"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="modalExluirLabel">
                      Excluir
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={cleanInputs}
                    ></button>
                  </div>
                  <div className="modal-body">
                    Tem certeza que deseja excluir este item?
                    <br />
                    Esta ação não poderá ser desfeita!
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                      onChange={cleanInputs}
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      data-bs-dismiss="modal"
                      onClick={deleteItem}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="modal fade"
              id="modalEditar"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex="-1"
              aria-labelledby="modalEditarLabel"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="modalEditarLabel">
                      Editar
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={cleanInputs}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <form className="row g-3">
                      <div className="col-md-10">
                        <label className="form-label">Nome:</label>
                        <input
                          type="name"
                          value={nome}
                          className="form-control"
                          onChange={(e) => setNome(e.target.value)}
                        />
                      </div>
                      <div className="col-md-2">
                        <label className="form-label">Nota:</label>
                        <input
                          type="text"
                          value={nota}
                          className="form-control"
                          onChange={(e) => setNota(e.target.value)}
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label">Descrição:</label>
                        <input
                          type="text"
                          value={descricao}
                          className="form-control"
                          onChange={(e) => setDescricao(e.target.value)}
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label">Imagem:</label>
                        <input
                          type="text"
                          value={imagem}
                          className="form-control"
                          onChange={(e) => setImagem(e.target.value)}
                        />
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                      onChange={cleanInputs}
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      className="btn btn-success"
                      data-bs-dismiss="modal"
                      onClick={editItem}
                    >
                      Concluir
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="restaurantes-listar-container">
              {restaurantes.map((item) => (
                <div key={item.id} className="restaurantes-listar-item">
                  <div
                    className="restaurantes-listar-imagem"
                    style={{ backgroundImage: `url(${item.imagem})` }}
                  ></div>
                  <div className="restaurantes-listar-descricao">
                    <h5>{item.nome}</h5>
                    <p>{item.descricao}</p>
                    <div>
                      <p>Nota: {item.nota}</p>
                    </div>
                    <div className="collapse" id="gerenciar-item">
                      <button
                        type="button"
                        className="btn btn-danger me-2"
                        data-bs-toggle="modal"
                        data-bs-target="#modalExcluir"
                        onClick={() => setItemId(item.id)}
                      >
                        Excluir
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-toggle="modal"
                        data-bs-target="#modalEditar"
                        onClick={() => setRestaurante(item)}
                      >
                        Editar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Restaurantes;
