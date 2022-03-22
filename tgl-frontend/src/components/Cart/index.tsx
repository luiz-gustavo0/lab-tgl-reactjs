import * as S from './styles';

import { CartItems } from './CartItems';
import iconArrowRight from 'img/arrow-right-green.svg';

export const Cart = () => {
  return (
    <S.Container>
      <S.Content>
        <h3>Cart</h3>
        <CartItems />
        <h4>
          Cart <span>Total: R$ 7,00</span>
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
