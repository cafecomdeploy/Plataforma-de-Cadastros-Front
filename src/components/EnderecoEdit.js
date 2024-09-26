import React, { useState, useEffect } from 'react'; 
import { useNavigate, useLocation } from 'react-router-dom'; 
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

const EnderecoEdit = () => {
  const [formData, setFormData] = useState({
    logradouro: '',
    cidade: '',
    estado: '',
    cep: '',
  });
  const [errors, setErrors] = useState({ cep: '' });
  const navigate = useNavigate();
  const location = useLocation();
  
  const addressId = location.state?.addressId;

  useEffect(() => {
    if (!addressId) {
      alert('Endereço não encontrado.');
      navigate('/endereco');
      return;
    }

    const fetchAddressData = async () => {
      const token_pass = localStorage.getItem('token');
      const response = await fetch(`http://127.0.0.1:8000/address-user/${addressId}`, {
        headers: {
          'Authorization': `Bearer ${token_pass}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setFormData(data);
      } else {
        alert('Erro ao buscar dados do endereço.');
      }
    };

    fetchAddressData();
  }, [addressId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'cep') {
      if (value !== '' && !validarCep(value)) {
        setErrors({ ...errors, cep: 'CEP inválido. O formato deve ser 00000-000.' });
      } else {
        setErrors({ ...errors, cep: '' });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validarCep(formData.cep)) {
      alert('Por favor, corrija os erros antes de enviar.');
      return;
    }

    try {
      const token_pass = localStorage.getItem('token');
      const dataToSend = { ...formData };

      const response = await fetch(`http://127.0.0.1:8000/address/${addressId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token_pass}`,
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar o endereço');
      }

      alert('Endereço atualizado com sucesso!');
      navigate('/endereco', { state: { refresh: true } });

    } catch (error) {
      console.error(error);
      alert('Houve um erro ao atualizar o endereço. Tente novamente.');
    }
  };

  return (
    <div className="container">
      <h2>Atualização de Endereço</h2>
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
        <button type="submit" className="submit-button">Atualizar</button>
      </form>
    </div>
  );
};

export default EnderecoEdit;
