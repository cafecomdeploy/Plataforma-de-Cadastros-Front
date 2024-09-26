import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Ícones para editar e deletar
import '../styles/CadastroEndereco.css'; // Estilos personalizados
import Button from './Button';

const CadastroEndereco = () => {
  const [enderecos, setEnderecos] = useState([]);
  const navigate = useNavigate();
  const location = useLocation(); // Para acessar o estado da navegação
  const token_pass = localStorage.getItem('token'); // Pegando o token diretamente

  // Função para buscar endereços cadastrados da API
  const fetchEnderecos = () => {
    fetch(`http://127.0.0.1:8000/address-user/${localStorage.getItem('user_id')}`, {
      headers: {
        'Authorization': `Bearer ${token_pass}`, // Passando o token
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Logando os dados recebidos
        setEnderecos(data);
      })
      .catch((error) => console.error('Erro ao buscar endereços:', error));
  };
  

  // Carregar endereços na montagem do componente e quando o estado mudar
  useEffect(() => {
    fetchEnderecos();
  }, [location.state]); // Dependência para reexecutar ao voltar com o estado

  const handleNovoEndereco = () => {
    navigate('/novo-endereco'); // Ajuste o caminho de navegação conforme a sua rota de endereço
  };

  // Função para deletar endereço
  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:8000/addresses/${id}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token_pass}`, // Passando o token
      },
    })
      .then(() => {
        setEnderecos(enderecos.filter(endereco => endereco.id !== id));
        alert('Endereço deletado com sucesso!');
      })
      .catch((error) => console.error('Erro ao deletar endereço:', error));
  };

  // Função para editar endereço
  const handleEdit = (id) => {
    navigate(`/editar-endereco`, { state: { addressId: id } });
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
            <div  className="endereco-item">
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
