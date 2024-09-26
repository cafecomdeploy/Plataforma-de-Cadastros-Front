import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormLogin from './components/Form_login';
import Cadastro from './components/Cadastro';
import CadastroEndereco from './components/CadastroEndereco'
import Endereco from './components/Endereco';
import PrivateRoute from './PrivateRoute';
import useAuth from './AuthContext';

const App = () => {
    const { isAuthenticated } = useAuth();
    console.log(isAuthenticated)
    return (
        <Router>
            <Routes>
                <Route path="/" element={<FormLogin />} />

                <Route
                    path="/signup" element={<Cadastro />} />
                <Route
                    path="/endereco"
                    element={
                        <PrivateRoute isAuthenticated={isAuthenticated}>
                            <CadastroEndereco />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/novo-endereco"
                    element={
                        <PrivateRoute isAuthenticated={isAuthenticated}>
                            <Endereco />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App