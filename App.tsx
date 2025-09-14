
import React, { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import type { User } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (name: string, passport: string) => {
    setUser({
      name,
      passportNumber: passport,
      digitalId: `BID-${crypto.randomUUID()}`,
    });
  };

  const handleLogout = () => {
    setUser(null);
  }

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {user ? <Dashboard user={user} onLogout={handleLogout} /> : <LoginScreen onLogin={handleLogin} />}
    </div>
  );
};

export default App;
