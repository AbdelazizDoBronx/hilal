import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useLoginMutation } from '../../features/auth/authSlice';
import useForm from '../../hooks/useForm';
import Input from '../ui/Input';
import Button from '../ui/Button';
import FormStatus from '../ui/FormStatus';
import Form from '../ui/Form';

export default function LoginForm() {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const { values, status, setStatus, handleChange, handleSubmit } = useForm(
    {
      userEmail: '',
      userPassword: ''
    },
    async (credentials) => {
      const result = await login(credentials).unwrap();
      if (result.token) {
        localStorage.setItem('token', result.token);
        setStatus({ type: 'success', message: result.message });
        setTimeout(() => navigate('/dashboard'), 1000);
      }
    }
  );

  return (
    <Form onSubmit={handleSubmit} className="space-y-6">
      <FormStatus {...status} />

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
        Se connecter
      </Button>
    </Form>
  );
}