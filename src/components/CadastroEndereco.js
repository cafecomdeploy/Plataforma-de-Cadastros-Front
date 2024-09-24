import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CadastroEndereco.css'; // Estilos personalizados
import Button from './Button';

const CadastroEndereco = () => {
  const [enderecos, setEnderecos] = useState([]);
  const navigate = useNavigate();

  // Função para buscar endereços cadastrados da API
  useEffect(() => {
    fetch('http://127.0.0.1:8000/address-user/' +localStorage.getItem('user_id'))
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
      <Button onClick={handleNovoEndereco}>
        Novo Endereço
      </Button>

      {enderecos.length > 0 ? (
        <table className="highlight centered">
          <thead>
            <tr>
              <th>Rua</th>
              <th>Cidade</th>
              <th>Estado</th>
              <th>CEP</th>
            </tr>
          </thead>
          <tbody>
            {enderecos.map((endereco, index) => (
              <tr key={index}>
                <td>{endereco.logradouro}</td>
                <td>{endereco.cidade}</td>
                <td>{endereco.estado}</td>
                <td>{endereco.cep}</td>
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
