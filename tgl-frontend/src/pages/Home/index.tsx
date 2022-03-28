import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { useAppSelector } from 'store/hooks';
import { clearBetState, getBets, selectBet } from 'features/bets/betsSlice';
import { getGames, selectGame, setGameSelected } from 'features/game/gameSlice';

import { Container, Header, Spinner } from 'components';
import arrowRightIcon from 'img/arrow-right.svg';

import * as S from './styles';
import { formatDate, formatNumber } from 'utils/format';
import { fetchBets } from 'services/bets';

const Home = () => {
  const [filters, setFilters] = useState<string[]>([]);
  const { bets, status, error } = useAppSelector(selectBet);
  const { games } = useAppSelector(selectGame);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGames());
  }, []);

  useEffect(() => {
    dispatch(getBets({ params: filters }));
  }, [filters]);

  useEffect(() => {
    if (status === 'FAILED') {
      toast.error(error);
      clearBetState();
    }
  }, [status]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;

    if (target.checked) {
      setFilters([...filters, target.value]);
    } else {
      setFilters((prevState) =>
        prevState.filter((filter) => filter !== target.value)
      );
    }
  };

  function checkFilter(item: string) {
    return filters.includes(item);
  }

  const formatedBets = bets.map((bet) => {
    return {
      ...bet,
      game: games.filter((game) => game.id === bet.game_id),
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
              <S.Label key={game.id} htmlFor={game.type} color={game.color}>
                <input
                  type='checkbox'
                  id={game.type}
                  value={game.type}
                  checked={checkFilter(game.type)}
                  onChange={handleChange}
                />
                <span>{game.type}</span>
              </S.Label>
            ))}
          </S.Filters>
          <Link to='new-bet'>
            New Bet
            <img src={arrowRightIcon} alt='Arrow right icon' />
          </Link>
        </S.Navigation>
        <S.GamesContainer>
          {status === 'LOADING' && <Spinner full={false} />}
          {formatedBets.length === 0 && <span>No bets registred.</span>}
          {formatedBets.map((bet) => (
            <S.Game key={bet.id} color={bet.game[0].color}>
              <p className='game-number'>{bet.choosen_numbers}</p>
              <p className='game-price'>
                {formatDate(bet.created_at)} - ({formatNumber(bet.price)})
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
