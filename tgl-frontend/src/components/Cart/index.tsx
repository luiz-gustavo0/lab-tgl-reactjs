import { CartItems } from './CartItems';
import { useAppSelector } from 'store/hooks';
import {
  clearStateCart,
  closeCart,
  getTotalValueCart,
  selectCart,
} from 'features/cart/cartSlice';

import * as S from './styles';
import iconArrowRight from 'img/arrow-right-green.svg';
import { formatNumber } from 'utils/format';
import { useEffect } from 'react';
import { clearBetState, selectBet } from 'features/bets/betsSlice';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import iconCloseCart from 'img/clear.svg';
import { useNavigate } from 'react-router-dom';
import { postBet } from 'services/bets';
import { AxiosError } from 'axios';

export const Cart = () => {
  const totalCartValue = useAppSelector(getTotalValueCart);
  const { cart, isCartOpen } = useAppSelector(selectCart);
  const { status: betStatus, error } = useAppSelector(selectBet);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (betStatus === 'SUCCESS') {
      dispatch(clearBetState());
    }

    if (betStatus === 'FAILED') {
      toast.error(error);
      dispatch(clearBetState());
    }
  }, [betStatus]);

  const handleSaveBet = async () => {
    const games = cart.map((item) => {
      return {
        game_id: item.game.id,
        numbers: item.numbers,
      };
    });

    if (games.length === 0) {
      toast.warn('The cart is empty!');
      return;
    }
    try {
      const response = await postBet({ games });

      if (response.status === 200) {
        toast.success('Bet save successfully');
        dispatch(clearStateCart());
        dispatch(closeCart());
        navigate('/');
      }
    } catch (error) {
      const handleError = error as AxiosError;
      if (!handleError.response) {
        throw error;
      }
      toast.error(handleError.response.data.message);
    }
  };

  return (
    <>
      <S.ButtonCloseCart
        isOpen={isCartOpen}
        onClick={() => dispatch(closeCart())}
      >
        <img src={iconCloseCart} alt='icon close cart' />
      </S.ButtonCloseCart>
      <S.Container>
        <S.Content>
          <h3>Cart</h3>

          <CartItems />
          <h4>
            Cart <span>Total: {formatNumber(totalCartValue)}</span>
          </h4>
        </S.Content>
        <S.Box>
          <button onClick={handleSaveBet}>
            Save <img src={iconArrowRight} alt='Arrow right icon' />
          </button>
        </S.Box>
      </S.Container>
    </>
  );
};
