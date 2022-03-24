import { CartItems } from './CartItems';
import { useAppSelector } from 'store/hooks';
import {
  clearStateCart,
  getTotalValueCart,
  selectCart,
} from 'features/cart/cartSlice';

import * as S from './styles';
import iconArrowRight from 'img/arrow-right-green.svg';
import { formatNumber } from 'utils/format';
import { useEffect } from 'react';
import { clearBetState, createBet, selectBet } from 'features/bets/betsSlice';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

export const Cart = () => {
  const totalCartValue = useAppSelector(getTotalValueCart);
  const { cart } = useAppSelector(selectCart);
  const { status, error } = useAppSelector(selectBet);

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'SUCCESS') {
      dispatch(clearBetState());
      dispatch(clearStateCart());
    }

    if (status === 'FAILED') {
      toast.error(error?.message);
      dispatch(clearBetState());
    }
  }, [status]);

  const handleSaveBet = () => {
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
    dispatch(createBet({ games }));
  };

  return (
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
  );
};
