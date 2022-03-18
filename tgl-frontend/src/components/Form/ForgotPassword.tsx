import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';

import { Card } from 'components/Card';
import { Button } from './Button';
import { Input } from './Input';
import { CustomLink } from 'components/CustomLink';

import { useDispatch } from 'react-redux';
import { useAppSelector } from 'store/hooks';
import { clearState, resetPassword, selectAuth } from 'features/authSlice';

import * as S from './styles';
import iconArrowRight from 'img/arrow-right.svg';
import { Spinner } from 'components/Spinner';

type ForgotPasswordFormData = {
  email: string;
};

const forgotPasswordFormSchema = yup.object().shape({
  email: yup.string().required().email(),
});

export const ForgotPassword = () => {
  const { resetPasswordData, isError, error, isFetching, isSuccess } =
    useAppSelector(selectAuth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(forgotPasswordFormSchema),
  });

  const onSubmit: SubmitHandler<ForgotPasswordFormData> = async ({ email }) => {
    dispatch(resetPassword({ email }));
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Email sent successfully!');
      dispatch(clearState());
      navigate(`/auth/reset-password/${resetPasswordData?.token}`);
    }

    if (isError) {
      setFocus('email');
      toast.error(error?.message);
      dispatch(clearState());
    }
  }, [isSuccess, isError, setFocus]);

  return (
    <Card tittle='Reset password'>
      <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder='Email'
          {...register('email')}
          error={errors.email}
        />
        <Button>
          Send link
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
