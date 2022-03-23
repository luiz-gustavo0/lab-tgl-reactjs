import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { Cart, Header, Spinner } from 'components';
import { Button } from 'pages/Home/styles';

import { useAppSelector } from 'store/hooks';
import {
  addNumberSelected,
  addNumbersRandomly,
  clearGame,
  generateNumbersOfGame,
  getGames,
  selectGame,
  setGameSelected,
} from 'features/game/gameSlice';
import { addItemToCart } from 'features/cart/cartSlice';
import { CartItem, Game } from '@types';

import * as S from './styles';
import iconCart from 'img/cart.svg';

const NewBet = () => {
  const { games, gameSelected, status, error, numbersSelected } =
    useAppSelector(selectGame);
  const numbers = useAppSelector(generateNumbersOfGame);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGames());
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, []);

  const handleSelectNumber = (number: number) => {
    dispatch(addNumberSelected(number));
  };

  const handleSelectGame = (gameType: string) => {
    dispatch(setGameSelected(gameType));
    dispatch(clearGame());
  };

  const handleCompleteGame = () => {
    dispatch(addNumbersRandomly());
  };

  const handleAddItemToCart = (game: Game, numbers: number[]) => {
    if (numbers.length < game.max_number) {
      toast.warn(
        `There are ${
          game.max_number - numbers.length
        } numbers left to complete the game.`
      );
      return;
    }

    dispatch(addItemToCart({ game, numbers }));
  };

  return (
    <>
      <Header />
      <S.Container>
        <S.ContentGame>
          <h2>
            <span>New Bet </span>
            <span className='game-name'>Game name</span>
          </h2>
          <S.ChooseGame>
            <h4>Choose a game</h4>
            <div>
              {status === 'FAILED' && (
                <p className='error'>*Failed to load games </p>
              )}
              {status === 'LOADING' && <Spinner />}
              {games.map((game) => (
                <Button
                  key={game.id}
                  color={game.color}
                  isSelected={game.type === gameSelected.game?.type}
                  onClick={() => handleSelectGame(game.type)}
                >
                  {game.type}
                </Button>
              ))}
            </div>
          </S.ChooseGame>
          <S.GameDescription>
            <h4>Fill your bet</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum
              ducimus suscipit dicta asperiores impedit veniam facilis, eum
              eaque sapiente atque
            </p>
          </S.GameDescription>
          <S.NumbersContainer>
            {numbers.map((number) => (
              <S.ButtonNumber
                isSelected={numbersSelected.includes(number)}
                color={gameSelected.game?.color}
                key={number}
                onClick={() => handleSelectNumber(number)}
              >
                {number}
              </S.ButtonNumber>
            ))}
          </S.NumbersContainer>
          <S.GameControllers>
            <S.Button onClick={() => handleCompleteGame()}>
              Complete game
            </S.Button>
            <S.Button onClick={() => dispatch(clearGame())}>
              Clear game
            </S.Button>
            <S.Button
              outilined
              onClick={() =>
                handleAddItemToCart(gameSelected.game!, numbersSelected)
              }
            >
              <img src={iconCart} alt='Cart icon' />
              Add to cart
            </S.Button>
          </S.GameControllers>
        </S.ContentGame>
        <Cart />
      </S.Container>
    </>
  );
};

export default NewBet;
