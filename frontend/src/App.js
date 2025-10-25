import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with glass effect */}
        <div className="backdrop-blur-lg bg-white/10 rounded-3xl shadow-2xl p-6 sm:p-8 mb-6 border border-white/20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-2 drop-shadow-lg">
            ✨ Shari - File Sharer
          </h1>
          <p className="text-white/80 text-center text-sm sm:text-base">
            Share files and text seamlessly across all your devices
          </p>
        </div>

        {/* Main content */}
        {token ? (
          <Dashboard token={token} onLogout={handleLogout} />
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </div>
    </div>
  );
}

export default App;