import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../config';

const Login = ({ onLogin }) => {
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/login`, { password });
      onLogin(res.data.token);
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;