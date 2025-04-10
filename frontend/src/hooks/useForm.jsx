import { useState } from 'react';

const useForm = (initialState = {}, onSubmit) => {
  const [values, setValues] = useState(initialState);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    setStatus({ type: '', message: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(values);
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.data?.message || 'Une erreur est survenue'
      });
    }
  };

  return {
    values,
    status,
    setStatus,
    handleChange,
    handleSubmit
  };
};

export default useForm;