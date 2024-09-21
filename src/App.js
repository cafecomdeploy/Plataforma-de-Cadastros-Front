import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormLogin from './components/Form_login';
import Cadastro from './components/Cadastro'; 

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<FormLogin />} />
                <Route path="/signup" element={<Cadastro />} />
            </Routes>
        </Router>
    );
};

export default App