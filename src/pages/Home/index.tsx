import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuid4 } from 'uuid';

import { Desafeto } from '../../utils/types';
import { api }      from '../../utils/api';

import coracao from '../../assets/coracao.png';
import "./styles.scss";

function Home()
{
  const [desafetos, setDesafetos] = useState<Desafeto[]>([]);

  const [nomeDesafeto     , setNomeDesafeto     ] = useState<string>("");
  const [descricaoDesafeto, setDescricaoDesafeto] = useState<string>("");

  function loadDesafetos()
  {
    api.get<Desafeto[]>('desafeto')
      .then(response => { setDesafetos(response.data); });
  }

  useEffect(loadDesafetos, []);

  function adicionarDesafeto()
  {
    api.post(
      'desafeto',
      {
        nome: nomeDesafeto,
        descricao: descricaoDesafeto
      }
    )
      .then(response => {
        if (response.status === 200)
          loadDesafetos();
      });
  }

  return (
    <div className="home-page">
      
      <header>
        <h1 className="main-title" >GuardeiNoCorazón</h1>
        <img src={coracao} className="heart-icon" />
      </header>

      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {
            desafetos.map(desafeto => {
              return (
                <tr key={uuid4()} >
                  <td>{desafeto.id}</td>
                  <td>{desafeto.nome}</td>
                  <td>{desafeto.descricao}</td>
                  <td><Link to={`/desafeto/${desafeto.id}`} className="details-link" >Detalhar</Link></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

      {/* <!-- Button trigger modal --> */}
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Adicionar Desafeto
      </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <label htmlFor="nome-desafeto">Nome do Desafeto</label>
              <input
                type="text"
                className="form-control"
                value={nomeDesafeto}
                onChange={(e) => setNomeDesafeto(e.target.value)}
              /><br />

              <label htmlFor="descricao-desafeto">Descrição do Sujeito</label>
              <input
                type="text"
                className="form-control"
                value={descricaoDesafeto}
                onChange={(e) => setDescricaoDesafeto(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
              <button type="button" className="btn btn-primary" onClick={adicionarDesafeto} >Adicionar Desafeto</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Home;