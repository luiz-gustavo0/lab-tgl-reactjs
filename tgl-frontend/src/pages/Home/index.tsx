import { Link } from 'react-router-dom';
import { Container, Header, Spinner } from 'components';

import arrowRightIcon from 'img/arrow-right.svg';

import * as S from './styles';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getBets, selectBet } from 'features/bets/betsSlice';
import { useAppSelector } from 'store/hooks';
import { toast } from 'react-toastify';

const Home = () => {
  const { bets, status, error } = useAppSelector(selectBet);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBets());
  }, []);

  useEffect(() => {
    if (status === 'FAILED') {
      toast.error(error?.message);
    }
  }, [status]);

  return (
    <>
      <Header />
      <Container>
        <S.Navigation>
          <h2>Recent Games</h2>
          <S.Filters>
            <span>Filters</span>
            <S.Button isSelected color='#27C383'>
              Lotofácil
            </S.Button>
            <S.Button isSelected={false} color='#27C383'>
              MegaSena
            </S.Button>
            <S.Button isSelected={false} color='#27C383'>
              Lotomainia
            </S.Button>
          </S.Filters>
          <Link to='/'>
            New Bet
            <img src={arrowRightIcon} alt='Arrow right icon' />
          </Link>
        </S.Navigation>
        <S.GamesContainer>
          {status === 'LOADING' && <Spinner />}
          {status === 'SUCCESS' &&
            bets.map((bet) => (
              <S.Game key={bet.id}>
                <p className='game-number'>{bet.choosen_numbers}</p>
                <p className='game-price'>
                  {bet.created_at} - ({bet.price})
                </p>
                <p className='game-name'>{bet.type.type}</p>
              </S.Game>
            ))}
        </S.GamesContainer>
      </Container>
    </>
  );
};

export default Home;
