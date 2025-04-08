import LoginForm from '../components/auth/LoginForm';
import AuthLayout from '../components/auth/AuthLayout';
import {  Link } from 'react-router-dom';
export default function Login() {
  return (
    <AuthLayout
      title="Commencer"
      subtitle="Bienvenue chez AlHilal Distribution - Connectez-vous à votre compte"
    >
      <LoginForm />
      <div className="mt-6 text-center">
        <p className="text-sm text-neutral-500">
          Vous n'avez pas de compte?{' '}
          <Link to="/register" className="font-medium text-brand-600 hover:text-brand-500">
            Créez un compte
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}