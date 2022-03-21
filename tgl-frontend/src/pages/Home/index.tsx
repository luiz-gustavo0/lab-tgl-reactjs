import { Link } from 'react-router-dom';
import { Container, Header, Spinner } from 'components';

import arrowRightIcon from 'img/arrow-right.svg';

import * as S from './styles';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getBets, selectBet } from 'features/bets/betsSlice';
import { useAppSelector } from 'store/hooks';
import { toast } from 'react-toastify';
import { getGames, selectGame } from 'features/game/gameSlice';

const Home = () => {
  const { bets, status, error } = useAppSelector(selectBet);
  const { games } = useAppSelector(selectGame);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBets());
    dispatch(getGames());
  }, []);

  useEffect(() => {
    if (status === 'FAILED') {
      toast.error(error?.message);
    }
  }, [status]);

  const betsFormated = bets.map((bet) => {
    const game = games.find((game) => game.id === bet.game_id);
    return {
      ...bet,
      color: game?.color,
    };
  });

  return (
    <>
      <Header />
      <Container>
        <S.Navigation>
          <h2>Recent Games</h2>
          <S.Filters>
            <span>Filters</span>
            {games.map((game) => (
              <S.Button key={game.id} isSelected={false} color={game.color}>
                {game.type}
              </S.Button>
            ))}
          </S.Filters>
          <Link to='/'>
            New Bet
            <img src={arrowRightIcon} alt='Arrow right icon' />
          </Link>
        </S.Navigation>
        <S.GamesContainer>
          {status === 'LOADING' && <Spinner />}
          {status === 'SUCCESS' &&
            betsFormated.map((bet) => (
              <S.Game key={bet.id} color={bet.color}>
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
