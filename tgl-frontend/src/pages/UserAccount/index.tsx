import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { clearUserState, getUser, selectUser } from 'features/user/userSlice';
import { useAppSelector } from 'store/hooks';
import { updateUser } from 'services/user';

import { Button, Card, Container, Form, Header, Input } from 'components';
import * as S from './styles';
import { formatDate } from 'utils/format';

type UpdateUserData = {
  name?: string;
  email?: string;
};

const userDataSchema = yup.object().shape({
  name: yup.string().required('Required field'),
  email: yup.string().email('Enter a valid email.').required('Required field'),
});

const UserAccount = () => {
  const { user } = useAppSelector(selectUser);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateUserData>({ resolver: yupResolver(userDataSchema) });

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    if (user) {
      setValue('name', user.name);
      setValue('email', user.email);
    }
  }, [user]);

  const onSubmit: SubmitHandler<UpdateUserData> = async (values) => {
    try {
      const response = await updateUser(values);
      if (response.status === 200) {
        toast.success('Successfully updated');
        dispatch(clearUserState());
        dispatch(getUser());
      }
    } catch (error) {
      const handleError = error as AxiosError;
      if (!handleError.response) {
        throw error;
      }
      toast.error(handleError.response.data.error.message);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <S.Content>
          <S.UserData>
            <h2>Your data</h2>
            <p>
              <strong>Name:</strong> {user?.name}
            </p>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>Created at:</strong> {formatDate(user?.created_at!)}
            </p>
            <p>
              <strong>Updated at:</strong> {formatDate(user?.updated_at!)}
            </p>
          </S.UserData>

          <Card tittle='Edit your data'>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Input
                placeholder='Name'
                type='text'
                {...register('name')}
                error={errors.name}
              />
              <Input
                placeholder='Email'
                type='email'
                {...register('email')}
                error={errors.email}
              />
              <Button>Send</Button>
            </Form>
          </Card>
        </S.Content>
      </Container>
    </>
  );
};

export default UserAccount;
