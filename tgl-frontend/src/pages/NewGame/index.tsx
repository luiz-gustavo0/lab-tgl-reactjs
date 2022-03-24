import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Button, Card, Container, Form, Header, Input } from 'components';

import * as S from './styles';
import { useDispatch } from 'react-redux';
import { createGame, selectGame } from 'features/game/gameSlice';
import { useEffect } from 'react';
import { useAppSelector } from 'store/hooks';
import { toast } from 'react-toastify';

type CreateGameData = {
  name: string;
  description: string;
  price: number;
  max_number: number;
  range: number;
  color: string;
};

const CreateGameSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
  max_number: yup.number().required(),
  range: yup.number().required(),
  color: yup.string().required(),
});

const NewGame = () => {
  const { status, error } = useAppSelector(selectGame);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateGameData>({ resolver: yupResolver(CreateGameSchema) });
  const dispatch = useDispatch();

  const handleCreateGame: SubmitHandler<CreateGameData> = (data) => {
    dispatch(createGame(data));
  };

  useEffect(() => {
    if (status === 'FAILED') {
      toast.error(error?.message);
    }
  }, [status]);

  return (
    <>
      <Header />
      <Container>
        <S.Wrapper>
          <Card tittle='Create new game'>
            <Form onSubmit={handleSubmit(handleCreateGame)}>
              <Input
                placeholder='Name'
                {...register('name')}
                error={errors.name}
              />
              <Input
                placeholder='Description'
                {...register('description')}
                error={errors.name}
              />
              <Input
                placeholder='Price'
                type='number'
                min={1}
                step={0.1}
                {...register('price')}
                error={errors.name}
              />
              <Input
                placeholder='Max numbers'
                type='number'
                min={1}
                {...register('max_number')}
                error={errors.name}
              />
              <Input
                placeholder='Range'
                type='number'
                min={1}
                {...register('range')}
                error={errors.name}
              />
              <Input
                type='color'
                style={{ width: '100px', height: '40px' }}
                {...register('color')}
                error={errors.name}
              />

              <Button>Save</Button>
            </Form>
          </Card>
        </S.Wrapper>
      </Container>
    </>
  );
};

export default NewGame;
