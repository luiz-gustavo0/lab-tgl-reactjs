import * as S from './styles';

import { CartItems } from './CartItems';
import iconArrowRight from 'img/arrow-right-green.svg';
import { useAppSelector } from 'store/hooks';
import { selectCart } from 'features/cart/cartSlice';

export const Cart = () => {
  const { totalCartValue } = useAppSelector(selectCart);

  return (
    <S.Container>
      <S.Content>
        <h3>Cart</h3>

        <CartItems />
        <h4>
          Cart <span>Total: R$ {totalCartValue}</span>
        </h4>
      </S.Content>
      <S.Box>
        <button>
          Save <img src={iconArrowRight} alt='' />
        </button>
      </S.Box>
    </S.Container>
  );
};
