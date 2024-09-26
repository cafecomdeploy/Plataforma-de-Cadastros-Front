import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Ícones para editar e deletar
import '../styles/CadastroEndereco.css'; // Estilos personalizados
import Button from './Button';

const CadastroEndereco = () => {
  const [enderecos, setEnderecos] = useState([]);
  const navigate = useNavigate();

  // Função para buscar endereços cadastrados da API
  useEffect(() => {
    fetch('http://127.0.0.1:8000/address-user/' + localStorage.getItem('user_id'))
      .then((response) => response.json())
      .then((data) => setEnderecos(data))
      .catch((error) => console.error('Erro ao buscar endereços:', error));
  }, []);

  // Função para redirecionar para o componente de novo endereço
  const handleNovoEndereco = () => {
    navigate('/novo-endereco'); // Ajuste o caminho de navegação conforme a sua rota de endereço
  };

  // Função para deletar endereço
  const handleDelete = (id) => {
    // Chame a API para deletar o endereço
    fetch(`http://127.0.0.1:8000/address/${id}/`, { method: 'DELETE' })
      .then(() => {
        setEnderecos(enderecos.filter(endereco => endereco.id !== id));
        alert('Endereço deletado com sucesso!');
      })
      .catch((error) => console.error('Erro ao deletar endereço:', error));
  };

  // Função para editar endereço
  const handleEdit = (id) => {
    // Redirecione para a página de edição
    navigate(`/editar-endereco/${id}`);
  };

  return (
    <div className="container cadastro-endereco-container">
      <h5 className="center-align">Endereços Cadastrados</h5>
      <Button onClick={handleNovoEndereco}>
        Novo Endereço
      </Button>

      {enderecos.length > 0 ? (
        <div className="endereco-list">
          {enderecos.map((endereco) => (
            <div key={endereco.id} className="endereco-item">
              <div className="endereco-info">
                <p><strong>Rua:</strong> {endereco.logradouro}</p>
                <p><strong>Cidade:</strong> {endereco.cidade}</p>
                <p><strong>Estado:</strong> {endereco.estado}</p>
                <p><strong>CEP:</strong> {endereco.cep}</p>
              </div>
              <div className="endereco-actions">
                <FaEdit className="action-icon" onClick={() => handleEdit(endereco.id)} />
                <FaTrash className="action-icon" onClick={() => handleDelete(endereco.id)} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Nenhum endereço cadastrado.</p>
      )}
    </div>
  );
};

export default CadastroEndereco;
