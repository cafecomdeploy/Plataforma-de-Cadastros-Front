import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import Endereco from './Endereco';
import '../styles/CadastroEndereco.css';


const CadastroEndereco = () => {
    const navigate = useNavigate(); // Hook para navegação
    const [enderecos, setEnderecos] = useState([]);

    const handleCadastrar = () => {
        const novoEndereco = {
            logradouro: 'Rua Exemplo',
            cidade: 'Cidade Exemplo',
            estado: 'Estado Exemplo',
            cep: '00000-000',
        };
        setEnderecos([...enderecos, novoEndereco]);
    };

    const handleIrParaEndereco = () => {
        navigate('/endereco'); // Navega para o componente Endereco
    };

    return (
        <div className="cadastro-endereco">
            <Button onClick={handleCadastrar}>Cadastrar Endereço</Button>
            <Button onClick={handleIrParaEndereco}>Ver Endereço</Button>
            <TabelaEnderecos enderecos={enderecos} />
        </div>
    );
};

// Tabela de endereços
const TabelaEnderecos = ({ enderecos }) => {
    return (
        <table className="tabela-enderecos">
            <thead>
                <tr>
                    <th>Logradouro</th>
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
    );
};

export default CadastroEndereco;