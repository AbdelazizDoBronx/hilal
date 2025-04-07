import RegisterForm from '../components/auth/RegisterForm';
import AuthLayout from '../components/auth/AuthLayout';

export default function Register() {
  return (
    <AuthLayout
      title="Créer un compte"
      subtitle="Bienvenue chez AlHilal Distribution - Créez votre compte"
    >
      <RegisterForm />
      <div className="mt-6 text-center">
        <p className="text-sm text-neutral-500">
          Vous avez déjà un compte? <a href="/login" className="font-medium text-brand-600 hover:text-brand-500">Connectez-vous</a>
        </p>
      </div>
    </AuthLayout>
  );
}