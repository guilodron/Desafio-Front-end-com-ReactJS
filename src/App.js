import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => 
      setRepositories(response.data)
    )
  }, [])

  async function handleAddRepository() {
    const repository = await api.post('repositories', {
      url: 'nova-url.com',
      title: `Novo Repositorio ${Date.now()}`,
      techs : ["React", "Vue"]
    })

    setRepositories([...repositories, repository.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    const index = repositories.findIndex(repository => repository.id === id)

    repositories.splice(index, 1)

    setRepositories([...repositories])
  }

  return (
    <div>
      <ul data-testid="repository-list">
        
        {repositories.map(repository => (<li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
            </button>
          </li>))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
