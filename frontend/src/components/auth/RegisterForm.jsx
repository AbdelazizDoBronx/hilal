import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useRegisterMutation } from '../../features/auth/authSlice';
import useForm from '../../hooks/useForm';
import Input from '../ui/Input';
import Button from '../ui/Button';
import FormStatus from '../ui/FormStatus';
import Form from '../ui/Form';

export default function RegisterForm() {
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const { values, status, setStatus, handleChange, handleSubmit } = useForm(
    {
      userName: '',
      userEmail: '',
      userPassword: ''
    },
    async (userData) => {
      const result = await register(userData).unwrap();
      if (result) {
        setStatus({ type: 'success', message: 'Compte créé avec succès!' });
        setTimeout(() => navigate('/login'), 1500);
      }
    }
  );

  return (
    <Form onSubmit={handleSubmit} className="space-y-6">
      <FormStatus {...status} />

      <Input
        id="userName"
        name="userName"
        type="text"
        label="Nom d'utilisateur"
        icon={User}
        placeholder="Votre nom"
        value={values.userName}
        onChange={handleChange}
        required
      />

      <Input
        id="userEmail"
        name="userEmail"
        type="email"
        label="Email"
        icon={Mail}
        placeholder="nom@alhilal.com"
        value={values.userEmail}
        onChange={handleChange}
        required
      />

      <Input
        id="userPassword"
        name="userPassword"
        type="password"
        label="Mot de passe"
        icon={Lock}
        placeholder="••••••••"
        value={values.userPassword}
        onChange={handleChange}
        required
      />

      <Button
        type="submit"
        isLoading={isLoading}
        icon={ArrowRight}
        className="w-full"
      >
        S'inscrire
      </Button>
    </Form>
  );
}