import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';

import { useAppSelector } from 'store/hooks';
import {
  clearResetPasswordState,
  resetPassword,
  selectResetPassword,
} from 'features/auth/resetPasswordSlice';

import { Button, Card, CustomLink, Form, Input, Spinner } from 'components';
import iconArrowRight from 'img/arrow-right.svg';

type ForgotPasswordFormData = {
  email: string;
};

const forgotPasswordFormSchema = yup.object().shape({
  email: yup.string().required().email(),
});

const ResetPassword = () => {
  const { error, status, token, user } = useAppSelector(selectResetPassword);

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
    if (status === 'SUCCESS') {
      toast.success('Email sent successfully!');
      dispatch(clearResetPasswordState());
      navigate(`/auth/reset-password/${token}`);
    }

    if (status === 'FAILED') {
      setFocus('email');
      toast.error(error?.message);
      dispatch(clearResetPasswordState());
    }
  }, [status, setFocus]);

  return (
    <Card tittle='Reset password'>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder='Email'
          {...register('email')}
          error={errors.email}
        />
        <Button>
          Send link
          {status === 'LOADING' ? (
            <Spinner />
          ) : (
            <img src={iconArrowRight} alt='Arrow right icon' />
          )}
        </Button>
      </Form>

      <CustomLink href='/auth' text='Back' />
    </Card>
  );
};

export default ResetPassword;
