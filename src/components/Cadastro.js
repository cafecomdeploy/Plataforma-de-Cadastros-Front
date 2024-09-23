import React, { useState } from "react";
import '../styles/Cadastro.css'; // Importando o arquivo de estilos

const Cadastro = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.senha !== formData.confirmarSenha) {
      setError("As senhas não coincidem");
    } else {
      setError("");
      // Aqui você pode enviar os dados para o back-end
      console.log("Formulário enviado com sucesso!", formData);
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
