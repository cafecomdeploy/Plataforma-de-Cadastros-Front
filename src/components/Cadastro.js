import React, { useState } from 'react';
import Button from './Button';
import 'materialize-css/dist/css/materialize.min.css';
import '../styles/Cadastro.css'; // Para o CSS personalizado

const Cadastro = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    dataNascimento: '',
    senha: '',
    confirmarSenha: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.nome) newErrors.nome = 'Nome é obrigatório';
    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.dataNascimento) newErrors.dataNascimento = 'Data de nascimento é obrigatória';
    if (!formData.senha) newErrors.senha = 'Senha é obrigatória';
    if (formData.senha !== formData.confirmarSenha) {
      newErrors.confirmarSenha = 'As senhas não coincidem';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log(JSON.stringify(formData));
    setErrors({});
    // Aqui você pode fazer a chamada ao backend
  };

  return (
    <div className="container cadastro-container">
      <div className="card-panel">
        <h5 className="center-align">Formulário de Cadastro</h5>
        <form onSubmit={handleSubmit}>
          {['nome', 'email', 'dataNascimento', 'senha', 'confirmarSenha'].map((field, index) => (
            <div className="input-field" key={index}>
              <input
                type={field.includes('senha') ? 'password' : field === 'dataNascimento' ? 'date' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
              />
              <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1).replace('dataNascimento', 'Data de Nascimento')}</label>
              {errors[field] && <span className="red-text">{errors[field]}</span>}
            </div>
          ))}
          <Button type="submit">Cadastrar</Button>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;
