import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CadastroEndereco.css'; // Estilos personalizados

const CadastroEndereco = () => {
  const [enderecos, setEnderecos] = useState([]);
  const navigate = useNavigate();

  // Função para buscar endereços cadastrados da API
  useEffect(() => {
    fetch('https://sua-api.com/enderecos')
      .then((response) => response.json())
      .then((data) => setEnderecos(data))
      .catch((error) => console.error('Erro ao buscar endereços:', error));
  }, []);

  // Função para redirecionar para o componente de novo endereço
  const handleNovoEndereco = () => {
    navigate('/novo-endereco'); // Ajuste o caminho de navegação conforme a sua rota de endereço
  };

  return (
    <div className="container cadastro-endereco-container">
      <h5 className="center-align">Endereços Cadastrados</h5>
      <button className="btn btn-primary" onClick={handleNovoEndereco}>
        Novo Endereço
      </button>

      {enderecos.length > 0 ? (
        <table className="highlight centered">
          <thead>
            <tr>
              <th>Rua</th>
              <th>Número</th>
              <th>Cidade</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {enderecos.map((endereco, index) => (
              <tr key={index}>
                <td>{endereco.rua}</td>
                <td>{endereco.numero}</td>
                <td>{endereco.cidade}</td>
                <td>{endereco.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhum endereço cadastrado.</p>
      )}
    </div>
  );
};

export default CadastroEndereco;
