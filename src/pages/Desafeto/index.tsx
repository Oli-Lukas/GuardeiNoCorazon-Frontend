import { useParams, useNavigate } from 'react-router-dom';
import coracao from '../../assets/coracao.png';
import { v4 as uuid4 } from 'uuid';

import './styles.scss';
import { useEffect, useState } from 'react';
import { api } from '../../utils/api';
import { Desafeto, Desavenca } from '../../utils/types';

function DesafetoPage()
{
  const [desafeto, setDesafeto] = useState<Desafeto>();
  const [desavencas, setDesavencas] = useState<Desavenca[]>([]);

  const [titulo, setTitulo] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');

  const navigate = useNavigate();
  const { id } = useParams();

  function backToHome()
  {
    navigate('/');
  }

  function loadDesafeto()
  {
    api.get<Desafeto>(`desafeto/${id}`)
      .then(response => {
        setDesafeto(response.data);
      });
  }

  useEffect(loadDesafeto, []);

  function loadDesavencas()
  {
    api.get<Desavenca[]>(`desavenca/${id}`)
      .then(response => {
        setDesavencas(response.data);
      });
  }

  useEffect(loadDesavencas, []);

  function adicionarDesavenca()
  {
    api.post(`desavenca/${id}`, { titulo, descricao })
      .then(response => {
        if (response.status === 200)
          loadDesavencas();
      });
  }

  return (
    <div className="desafeto-page">
      <header>
        <button onClick={backToHome} className="btn btn-primary" >Voltar</button>
        <h1 className="main-title" >{desafeto?.nome}</h1>
        <img src={coracao} className="heart-icon" />
      </header>

      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Titulo</th>
            <th>Descrição</th>
          </tr>
        </thead>

        <tbody>
          {
            desavencas.map(desavenca => {
              return (
                <tr key={uuid4()} >
                  <td>{desavenca.id}</td>
                  <td>{desavenca.titulo}</td>
                  <td>{desavenca.descricao}</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>

      {/* Button trigger modal */}
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Adicionar Desavenca
      </button>

      {/* Modal */}
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <label htmlFor="nome-desafeto">Titulo da Desavença</label>
              <input
                type="text"
                className="form-control"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              /><br />

              <label htmlFor="descricao-desafeto">Descrição da Desavença</label>
              <textarea
                className="form-control"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
              <button type="button" className="btn btn-primary" onClick={adicionarDesavenca} >Adicionar Desavença</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default DesafetoPage;