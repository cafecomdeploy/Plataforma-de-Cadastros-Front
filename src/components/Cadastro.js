import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/Cadastro.css'; 
const Cadastro = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    dataNascimento: "",
    senha: "",
    confirmarSenha: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.senha !== formData.confirmarSenha) {
      setError("As senhas não coincidem");
    } else {
      setError("");
  
      const dataToSend = {
        nome: formData.nome,
        email: formData.email,
        data_nascimento: formData.dataNascimento,
        senha: formData.senha,
      };
  
      try {
        const response = await fetch('http://127.0.0.1:8000/users/register/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.message || "Erro ao registrar usuário");
        } else {
          const responseData = await response.json();
          console.log("Formulário enviado com sucesso!", responseData);
          navigate('/'); 
        }
      } catch (error) {
        setError("Erro de rede. Tente novamente mais tarde.");
        console.error("Erro ao enviar o formulário:", error);
      }
    }
  };
  

  return (
    <div className="cadastro-container">
      <form onSubmit={handleSubmit} className="form">
        <h2 className="title">Cadastro de Usuário</h2>

        <div className="input-group">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="dataNascimento">Data de Nascimento:</label>
          <input
            type="date"
            name="dataNascimento"
            value={formData.dataNascimento}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="confirmarSenha">Confirme a Senha:</label>
          <input
            type="password"
            name="confirmarSenha"
            value={formData.confirmarSenha}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="button">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default Cadastro;
