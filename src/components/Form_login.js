import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/form_login.css';
import Button from './Button';

const FormLogin = () => {
    const [email, setEmail] = useState('');
    const [senha, setsenha] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError('Por favor, insira um e-mail válido.');
            return;
        }

        setError('');

        try {
            const response = await fetch('http://127.0.0.1:8000/users/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, senha }),
            });
            
            console.log('rEOTRNOI -> ', response)
            console.log('bODY: ', response.body)
            if (!response.ok) {
                throw new Error('Credenciais inválidas');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token); // Armazena o token no localStorage
            navigate('/signup'); // Redireciona para a página de cadastro
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSignUpRedirect = () => {
        navigate('/signup'); // Redireciona para a página de cadastro
    };

    return (
        <div className="login-container">
            <div className="image-container"></div>
            <div className="form-container">
                <h2>Login</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Senha:</label>
                        <input
                            type="password"
                            value={senha}
                            onChange={(e) => setsenha(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit">Entrar</Button>
                </form>
                <p>
                    Não tem uma conta?{' '}
                    <span className="link" onClick={handleSignUpRedirect}>
                        Cadastre-se
                    </span>
                </p>
            </div>
        </div>
    );
};

export default FormLogin;
