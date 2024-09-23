import React, { useState } from 'react';
import '../styles/Endereco.css'; // Importando o CSS

const Endereco = () => {
  const [logradouro, setLogradouro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cep, setCep] = useState('');
  const [cepValido, setCepValido] = useState(true);

  const validarCEP = (cep) => {
    const regex = /^[0-9]{5}-?[0-9]{3}$/; // Formato: 12345-678
    return regex.test(cep);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarCEP(cep)) {
      alert('Endereço salvo com sucesso!');
      // Aqui você pode adicionar a lógica para enviar os dados
      resetForm();
    } else {
      setCepValido(false);
    }
  };

  const resetForm = () => {
    setLogradouro('');
    setCidade('');
    setEstado('');
    setCep('');
    setCepValido(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Logradouro:
          <input
            type="text"
            value={logradouro}
            onChange={(e) => setLogradouro(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Cidade:
          <input
            type="text"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Estado:
          <input
            type="text"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          CEP:
          <input
            type="text"
            value={cep}
            onChange={(e) => {
              setCep(e.target.value);
              setCepValido(true); // Resetar erro ao digitar
            }}
            required
          />
        </label>
        {!cepValido && <span className="error">CEP inválido</span>}
      </div>
      <button type="submit">Salvar Endereço</button>
    </form>
  );
};

export default Endereco;
