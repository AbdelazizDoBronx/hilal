import { useSelector } from 'react-redux';
import { useUpdateProfileMutation } from '../../features/auth/authSlice';
import useForm from '../../hooks/useForm';
import Form from '../ui/Form';
import Input from '../ui/Input';
import Button from '../ui/Button';
import FormStatus from '../ui/FormStatus';

const Profile = () => {
  const user = useSelector((state) => state.user.userInfo);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const { values, status, setStatus, handleChange, handleSubmit } = useForm(
    {
      username: user?.username || '',
      useremail: user?.useremail || ''
    },
    async (userData) => {
      try {
        console.log('Sending update with data:', userData); // Debug log
        const result = await updateProfile(userData).unwrap();
        console.log('Update result:', result); // Debug log
        
        setStatus({ 
          type: 'success', 
          message: 'Profile updated successfully!' 
        });
      } catch (error) {
        console.error('Update error details:', error.data); // Debug log
        setStatus({ 
          type: 'error', 
          message: error.data?.message || 'Failed to update profile' 
        });
      }
    }
  );

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Update Profile</h2>
      <Form onSubmit={handleSubmit} className="space-y-6">
        <FormStatus {...status} />
        
        <Input
          label="Username"
          name="username"
          value={values.username}
          onChange={handleChange}
          required
        />
        
        <Input
          label="Email"
          name="useremail"
          type="email"
          value={values.useremail}
          onChange={handleChange}
          required
        />
        
        <Button
          type="submit"
          isLoading={isLoading}
          className="w-full"
        >
          Update Profile
        </Button>
      </Form>
    </div>
  );
};

export default Profile;