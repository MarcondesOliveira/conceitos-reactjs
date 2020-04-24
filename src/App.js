import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await api.get('repositories');
      setRepositories(response.data);
    }
    fetchData();
  }, []);


  async function handleAddRepository(e) {
    // TODO
    e.preventDefault();

    const response = await api.post("repositories", {
      title,
      url,
      techs,
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);

    setTitle('')
    setUrl('')
    setTechs('')

  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`/repositories/${id}`);

    setRepositories(repositories.filter((repository) => repository.id !== id));
  }

  return (
    <div className="container">
      <h4>Adicione um novo repositório</h4>
      
      <div className="inputs">
        <form>
          <div className="form-row">
            <div className="col-md-4 mb-3">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nome do repositório"
              ></input>
            </div>
          </div>
          <div className="form-row">
            <div className="col-md-4 mb-3">
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="url do repositório" 
              ></input>
            </div>
          </div>
          <div className="form-row">
            <div className="col-md-4 mb-3">
              <input
                value={techs}
                onChange={(e) => setTechs(e.target.value)}
                placeholder="Tecnologias"
              ></input>
            </div>
          </div>
        </form>
        <button onClick={handleAddRepository}>Adicionar</button>
      </div>

      <div className="list">
        <ul data-testid="repository-list" className="list-group">
          {repositories.map((repository) => (
            <li key={repository.id} className="list-group-item">
              {repository.title}
              {/* Repositório 1 */}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
