import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; // Importando useNavigate
import '../styles/Endereco.css';

const estados = [
  'Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Distrito Federal', 
  'Espírito Santo', 'Goiás', 'Maranhão', 'Mato Grosso', 'Mato Grosso do Sul', 
  'Minas Gerais', 'Pará', 'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 
  'Rio de Janeiro', 'Rio Grande do Norte', 'Rio Grande do Sul', 
  'Rondônia', 'Roraima', 'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantins'
];

const validarCep = (cep) => {
  return /^[0-9]{5}-[0-9]{3}$/.test(cep);
};

const Endereco = () => {
  const [formData, setFormData] = useState({
    logradouro: '',
    cidade: '',
    estado: '',
    cep: '',
  });
  const [errors, setErrors] = useState({ cep: '' });
  const navigate = useNavigate(); // Usando useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validação do CEP
    if (name === 'cep' && value !== '' && !validarCep(value)) {
      setErrors({ ...errors, cep: 'CEP inválido. O formato deve ser 00000-000.' });
    } else {
      setErrors({ ...errors, cep: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarCep(formData.cep)) {
      alert('Por favor, corrija os erros antes de enviar.');
      return;
    }

    try {
      // Obtenha o user_id do localStorage
      const usuario_id = localStorage.getItem('user_id');
      const dataToSend = { ...formData, usuario_id }; // Inclua o user_id nos dados enviados

      const response = await fetch('http://127.0.0.1:8000/cadastro/address/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error('Erro ao cadastrar o endereço');
      }

      alert('Endereço cadastrado com sucesso!');
      setFormData({ logradouro: '', cidade: '', estado: '', cep: '' }); 
      
      navigate('/endereco'); 

    } catch (error) {
      console.error(error);
      alert('Houve um erro ao cadastrar o endereço. Tente novamente.');
    }
  };

  return (
    <div className="container">
      <h2>Cadastro de Endereço</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Logradouro:</label>
          <input
            type="text"
            name="logradouro"
            value={formData.logradouro}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Cidade:</label>
          <input
            type="text"
            name="cidade"
            value={formData.cidade}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Estado:</label>
          <select
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um estado</option>
            {estados.map((estado) => (
              <option key={estado} value={estado}>{estado}</option>
            ))}
          </select>
        </div>
        <div>
          <label>CEP:</label>
          <input
            type="text"
            name="cep"
            value={formData.cep}
            onChange={handleChange}
            required
            placeholder="00000-000"
          />
          {errors.cep && <span className="error">{errors.cep}</span>}
        </div>
        <button type="submit" className="submit-button">Cadastrar</button>
      </form>
    </div>
  );
};

export default Endereco;
