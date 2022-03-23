import { CartItems } from './CartItems';
import { useAppSelector } from 'store/hooks';
import { getTotalValueCart } from 'features/cart/cartSlice';

import * as S from './styles';
import iconArrowRight from 'img/arrow-right-green.svg';
import { formatNumber } from 'utils/format';

export const Cart = () => {
  const totalCartValue = useAppSelector(getTotalValueCart);

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
        <button>
          Save <img src={iconArrowRight} alt='Arrow right icon' />
        </button>
      </S.Box>
    </S.Container>
  );
};
