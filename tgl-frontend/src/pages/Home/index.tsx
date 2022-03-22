import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { useAppSelector } from 'store/hooks';
import {
  clearBetState,
  getBets,
  selectBet,
  updateFilterStatus,
} from 'features/bets/betsSlice';
import { getGames, selectGame, setGameSelected } from 'features/game/gameSlice';

import { Container, Header, Spinner } from 'components';
import arrowRightIcon from 'img/arrow-right.svg';

import * as S from './styles';

const Home = () => {
  const { bets, status, error, filterStatus } = useAppSelector(selectBet);
  const { games, gameSelected } = useAppSelector(selectGame);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBets());
    dispatch(getGames());
  }, []);

  useEffect(() => {
    if (status === 'FAILED') {
      toast.error(error?.message);
      clearBetState();
    }
  }, [status]);

  const handleFilterBets = useCallback((gameType: string) => {
    dispatch(updateFilterStatus(gameType));
    dispatch(setGameSelected(gameType));
  }, []);

  const betsCopy = [...bets];
  const betsFormated = betsCopy.map((bet) => {
    const game = games.find((game) => game.id === bet.game_id);
    return {
      ...bet,
      color: game?.color,
    };
  });

  const filteredBets = betsFormated.filter((bet) => {
    if (filterStatus === 'all') {
      return true;
    }
    return bet.type.type === filterStatus;
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
              <S.Button
                key={game.id}
                color={game.color}
                onClick={() => handleFilterBets(game.type)}
                isSelected={
                  filterStatus !== 'all' &&
                  gameSelected.game?.type === game.type
                }
              >
                {game.type}
              </S.Button>
            ))}
          </S.Filters>
          <Link to='new-bet'>
            New Bet
            <img src={arrowRightIcon} alt='Arrow right icon' />
          </Link>
        </S.Navigation>
        <S.GamesContainer>
          {status === 'LOADING' && <Spinner />}
          {filteredBets ? (
            filteredBets.map((bet) => (
              <S.Game key={bet.id} color={bet.color}>
                <p className='game-number'>{bet.choosen_numbers}</p>
                <p className='game-price'>
                  {bet.created_at} - ({bet.price})
                </p>
                <p className='game-name'>{bet.type.type}</p>
              </S.Game>
            ))
          ) : (
            <p>No bet registered.</p>
          )}
        </S.GamesContainer>
      </Container>
    </>
  );
};

export default Home;
