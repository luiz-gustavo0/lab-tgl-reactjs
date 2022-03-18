import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';

import { useAppSelector } from 'store/hooks';
import { login, selectAuth, clearLoginState } from 'features/auth/loginSlice';

import { Button, Card, CustomLink, Form, Input, Spinner } from 'components';
import iconArrowRight from 'img/arrow-right.svg';

type LoginFormData = {
  email: string;
  password: string;
};

const loginFormSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

const Login = () => {
  const { error, status, user } = useAppSelector(selectAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: yupResolver(loginFormSchema) });

  const handleLogin: SubmitHandler<LoginFormData> = ({ email, password }) => {
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (status === 'SUCCESS') {
      toast.success(`Bem vindo ${user?.name}!`);
      dispatch(clearLoginState());
      navigate('/');
    }

    if (status === 'FAILED') {
      toast.error(error?.message);
      dispatch(clearLoginState());
    }
  }, [status]);

  return (
    <Card tittle='Authentication'>
      <Form onSubmit={handleSubmit(handleLogin)}>
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
        <Link to='forgot-password'>I forgot my password</Link>
        <Button>
          Log In
          {status === 'LOADING' ? (
            <Spinner />
          ) : (
            <img src={iconArrowRight} alt='Arrow right icon' />
          )}
        </Button>
      </Form>

      <CustomLink href='register' text='Sign Up' />
    </Card>
  );
};

export default Login;
