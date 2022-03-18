import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';

import { Card } from 'components/Card';
import { CustomLink } from 'components/CustomLink';
import { Spinner } from 'components/Spinner';
import { Button } from './Button';
import { Input } from './Input';

import { useAppSelector } from 'store/hooks';
import { selectUser, signUpUser, clearState } from 'features/userSlice';

import * as S from './styles';
import iconArrowRight from 'img/arrow-right.svg';

type SignupFormData = {
  name: string;
  email: string;
  password: string;
};

const SugnupFormSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required(),
});

export const Register = () => {
  const { error, isError, isFetching, isSuccess } = useAppSelector(selectUser);
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
    if (isSuccess) {
      toast.success(`Cadastrado com sucesso!`);
      dispatch(clearState());
      navigate('/auth');
    }

    if (isError) {
      toast.error(error?.message);
      dispatch(clearState());
    }
  }, [isSuccess, isError]);

  return (
    <Card tittle='Registration'>
      <S.FormContainer onSubmit={handleSubmit(handleSignup)}>
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
          {isFetching ? (
            <Spinner />
          ) : (
            <img src={iconArrowRight} alt='Arrow right icon' />
          )}
        </Button>
      </S.FormContainer>

      <CustomLink href='/auth' text='Back' />
    </Card>
  );
};
