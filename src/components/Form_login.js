import React, { useState } from 'react'; 
import { useNavigate  } from 'react-router-dom';
import '../styles/form_login.css'
import Button from './Button';

const FormLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); //direcionamento

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setError('Por favor, insira um e-mail válido.');
            return;
        }
        setError('');
        console.log('Login realizado com:', { email, password });
    };

    // Mover a lógica de redirecionamento para o onClick do link
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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

export default FormLogin
