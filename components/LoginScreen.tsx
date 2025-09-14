
import React, { useState } from 'react';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';

interface LoginScreenProps {
  onLogin: (name: string, passport: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [passport, setPassport] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && passport) {
      onLogin(name, passport);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-brand-primary to-brand-secondary">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-2xl">
        <div className="text-center">
            <div className="flex justify-center items-center mb-4">
                <ShieldCheckIcon className="h-16 w-16 text-brand-primary" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Tourist Safety System</h1>
            <p className="mt-2 text-gray-600">Secure Your Journey in India</p>
        </div>
        <div className="text-center p-4 bg-brand-safest border border-brand-secondary rounded-lg">
            <h2 className="text-lg font-semibold text-brand-primary">Blockchain-based Digital ID</h2>
            <p className="text-sm text-gray-700 mt-1">Register once for a secure, tamper-proof digital identity for safe check-ins and verification throughout your trip.</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
              placeholder="e.g., Jane Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="passport" className="text-sm font-medium text-gray-700">
              Passport / ID Number
            </label>
            <input
              id="passport"
              name="passport"
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
              placeholder="e.g., A12345678"
              value={passport}
              onChange={(e) => setPassport(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors"
          >
            Create Digital ID & Enter
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
