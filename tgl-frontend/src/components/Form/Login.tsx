import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';

import { Card } from 'components/Card';
import { Spinner } from 'components/Spinner';
import { Button } from './Button';
import { Input } from './Input';

import { useAppSelector } from 'store/hooks';
import { login, selectAuth, clearState } from 'features/authSlice';

import iconArrowRight from 'img/arrow-right.svg';

import * as S from './styles';
import { CustomLink } from 'components/CustomLink';

type LoginFormData = {
  email: string;
  password: string;
};

const loginFormSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

export const Login = () => {
  const { error, isError, isSuccess, isFetching, user } =
    useAppSelector(selectAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: yupResolver(loginFormSchema) });

  const handleLogin: SubmitHandler<LoginFormData> = ({ email, password }) => {
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(`Bem vindo ${user?.name}!`);
      dispatch(clearState());
      navigate('/');
    }

    if (isError) {
      toast.error(error?.message);
      dispatch(clearState());
    }
  }, [isSuccess, isError]);

  return (
    <Card tittle='Authentication'>
      <S.FormContainer onSubmit={handleSubmit(handleLogin)}>
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
          {isFetching ? (
            <Spinner />
          ) : (
            <img src={iconArrowRight} alt='Arrow right icon' />
          )}
        </Button>
      </S.FormContainer>

      <CustomLink href='register' text='Sign Up' />
    </Card>
  );
};
