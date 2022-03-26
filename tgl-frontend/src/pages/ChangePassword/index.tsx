import { useNavigate, useParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';

import { changePassword } from 'services/auth';
import { Button, Card, CustomLink, Form, Input } from 'components';
import iconArrowRight from 'img/arrow-right.svg';

type ChangePasswordData = {
  password: string;
};

const changePasswordFormSchema = yup.object().shape({
  password: yup
    .string()
    .required('Required field')
    .min(6, 'Password must be at least 6 characters long '),
});

const ChangePassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordData>({
    resolver: yupResolver(changePasswordFormSchema),
  });

  const onSubmit: SubmitHandler<ChangePasswordData> = async ({ password }) => {
    if (!token) {
      toast.error('Token not found.');
      return navigate('/auth/forgot-password', { replace: true });
    }
    try {
      const response = await changePassword(token, password);

      if (response.status === 200) {
        toast.success('Password changed successfully!');
        navigate('/auth', { replace: true });
      }
    } catch (error) {
      toast.error('Failed to change password');
    }
  };

  return (
    <Card tittle='Change password'>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type='password'
          placeholder='Password'
          {...register('password')}
          error={errors.password}
        />
        <Button>
          Send
          <img src={iconArrowRight} alt='Arrow right icon' />
        </Button>
      </Form>

      <CustomLink href='/auth' text='Back' />
    </Card>
  );
};

export default ChangePassword;
