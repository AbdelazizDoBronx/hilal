import { useState } from 'react';
import { Mail, Lock, User, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';

export default function RegisterForm() {
  const [credentials, setCredentials] = useState({
    userName: '',
    userEmail: '',
    userPassword: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
    setStatus({ type: '', message: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await authService.register(
      credentials.userName,
      credentials.userEmail,
      credentials.userPassword
    );
    
    setStatus({
      type: result.success ? 'success' : 'error',
      message: result.message
    });

    if (result.success) {
      setTimeout(() => navigate('/dashboard'), 2000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {status.message && (
        <div className={`${
          status.type === 'success' 
            ? 'bg-emerald-50 border-emerald-400 text-emerald-700' 
            : 'bg-red-50 border-red-400 text-red-700'
        } border-l-4 p-4 rounded-lg shadow-sm backdrop-blur-sm transition-all duration-500 animate-fade-in`}>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {status.type === 'success' ? (
                <CheckCircle className="h-5 w-5 text-emerald-400" aria-hidden="true" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{status.message}</p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="userName" className="block text-sm font-medium text-neutral-700">
          Nom d'utilisateur
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User size={18} className="text-neutral-400" />
          </div>
          <input
            id="userName"
            name="userName"
            type="text"
            required
            className="input-search pl-10 w-full bg-white"
            placeholder="Votre nom"
            value={credentials.userName}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="userEmail" className="block text-sm font-medium text-neutral-700">
          Email
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail size={18} className="text-neutral-400" />
          </div>
          <input
            id="userEmail"
            name="userEmail"
            type="email"
            required
            className="input-search pl-10 w-full bg-white"
            placeholder="nom@alhilal.com"
            value={credentials.userEmail}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="userPassword" className="block text-sm font-medium text-neutral-700">
          Mot de passe
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock size={18} className="text-neutral-400" />
          </div>
          <input
            id="userPassword"
            name="userPassword"
            type="password"
            required
            className="input-search pl-10 w-full bg-white"
            placeholder="••••••••"
            value={credentials.userPassword}
            onChange={handleChange}
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center py-3.5 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 shadow-lg shadow-blue-600/20 group relative overflow-hidden"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        <span className="absolute top-0 left-0 w-full h-full bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
        <span className="relative font-medium text-base z-10">S'inscrire</span>
        <ArrowRight size={18} className="ml-2 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
      </button>
    </form>
  );
}