import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';

import { useAppSelector } from 'store/hooks';
import {
  selectUser,
  signUpUser,
  clearUserState,
} from 'features/user/userSlice';

import { Button, Card, CustomLink, Form, Input, Spinner } from 'components';
import iconArrowRight from 'img/arrow-right.svg';

type SignupFormData = {
  name: string;
  email: string;
  password: string;
};

const SugnupFormSchema = yup.object().shape({
  name: yup.string().required('Required field'),
  email: yup.string().required('Required field').email('Enter a valid email.'),
  password: yup
    .string()
    .required('Required field')
    .min(6, 'Password must be at least 6 characters long '),
});

const Register = () => {
  const { status, error } = useAppSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({ resolver: yupResolver(SugnupFormSchema) });

  const handleSignup: SubmitHandler<SignupFormData> = ({
    name,
    email,
    password,
  }) => {
    dispatch(signUpUser({ name, email, password }));
  };

  useEffect(() => {
    if (status === 'SUCCESS') {
      toast.success(`Cadastrado com sucesso!`);
      dispatch(clearUserState());
      navigate('/auth');
    }

    if (status === 'FAILED') {
      toast.error(error?.message);
      dispatch(clearUserState());
    }
  }, [status]);

  return (
    <Card tittle='Registration'>
      <Form onSubmit={handleSubmit(handleSignup)}>
        <Input placeholder='Name' {...register('name')} error={errors.name} />
        <Input
          type='email'
          placeholder='Email'
          {...register('email')}
          error={errors.email}
        />

        <Input
          type='password'
          placeholder='Password'
          {...register('password')}
          error={errors.password}
        />
        <Button>
          Register
          {status === 'LOADING' ? (
            <Spinner full={false} />
          ) : (
            <img src={iconArrowRight} alt='Arrow right icon' />
          )}
        </Button>
      </Form>

      <CustomLink href='/auth' text='Back' />
    </Card>
  );
};

export default Register;
