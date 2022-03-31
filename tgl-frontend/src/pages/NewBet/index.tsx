import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { Cart, Header } from 'components';
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
import { useMediaQuery } from 'hooks/useMediaQuery';
import { Game } from '@types';

import * as S from './styles';
import iconCart from 'img/cart.svg';

const NewBet = () => {
  const matches = useMediaQuery('(min-width: 800px)');

  const { games, gameSelected, error, numbersSelected } =
    useAppSelector(selectGame);
  const numbers = useAppSelector(generateNumbersOfGame);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGames());
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

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
    const numbersCopy = [...numbers];
    const ordenedNumbers = numbersCopy.sort((a, b) => a - b);

    if (numbers.length < game.max_number) {
      toast.warn(
        `There are ${
          game.max_number - numbers.length
        } numbers left to complete the game.`
      );
      return;
    }

    dispatch(addItemToCart({ game, numbers: ordenedNumbers }));
    dispatch(clearGame());
    toast.success('Game added to cart');
  };

  return (
    <>
      <Header />
      <S.Container>
        <S.ContentGame>
          <h2>
            <span>New Bet </span>
            <span className='game-name'>{gameSelected.game?.type}</span>
          </h2>
          <S.ChooseGame>
            <h4>Choose a game</h4>
            <div>
              {error && <p className='error'>*Failed to load games </p>}
              {games.map((game) => (
                <Button
                  key={game.id}
                  color={game.color}
                  isSelected={game.type === gameSelected.game?.type}
                  onClick={() => handleSelectGame(game.type)}
                  data-cy={game.type}
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
            <div>
              <S.Button
                onClick={() => handleCompleteGame()}
                data-cy='btn-complete-game'
              >
                Complete game
              </S.Button>
              <S.Button
                onClick={() => dispatch(clearGame())}
                data-cy='btn-clear-game'
              >
                Clear game
              </S.Button>
            </div>
            <S.Button
              outlined
              onClick={() =>
                handleAddItemToCart(gameSelected.game!, numbersSelected)
              }
              data-cy='btn-add-cart'
            >
              <img src={iconCart} alt='Cart icon' />
              Add to cart
            </S.Button>
          </S.GameControllers>
        </S.ContentGame>
        {matches && <Cart />}
      </S.Container>
    </>
  );
};

export default NewBet;
