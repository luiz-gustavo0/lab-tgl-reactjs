import { useAppSelector } from 'store/hooks';
import { selectCart } from 'features/cart/cartSlice';
import * as S from './styles';
import iconTrash from 'img/trash-o.svg';

export const CartItems = () => {
  const { cart } = useAppSelector(selectCart);

  return (
    <S.CartItemContainer>
      {cart.length === 0 && <p>No bets added to cart.</p>}
      {cart.map((item) => (
        <S.CartItem key={item.game.id}>
          <button>
            <img src={iconTrash} alt='Icon trash' />
          </button>
          <S.BoxInfo color={item.game.color}>
            <span className='numbers'>{item.numbers.toString()}</span>
            <p>
              <strong>{item.game.type}</strong>
              <span className='price'>{item.game.price}</span>
            </p>
          </S.BoxInfo>
        </S.CartItem>
      ))}
    </S.CartItemContainer>
  );
};
