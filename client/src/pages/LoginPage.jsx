// File: src/pages/LoginPage.jsx

import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // <-- Import useNavigate

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // <-- Inisialisasi hook navigasi

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email: email,
        password: password,
      });

      login(response.data.token);
      
      // Arahkan ke halaman dasbor ('/') setelah login berhasil
      navigate('/'); 

    } catch (err) {
      console.error('Login Gagal:', err.response.data.message);
      setError(err.response.data.message);
    }
  };
  
  // ... (bagian return form tetap sama) ...
  return (
    <div>
      <h2>Login Admin</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;