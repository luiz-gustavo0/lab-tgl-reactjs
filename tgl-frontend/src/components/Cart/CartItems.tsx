import { useAppSelector } from 'store/hooks';
import { removeItemFromCart, selectCart } from 'features/cart/cartSlice';
import * as S from './styles';
import iconTrash from 'img/trash-o.svg';
import { useDispatch } from 'react-redux';
import { formatNumber } from 'utils/format';

export const CartItems = () => {
  const { cart } = useAppSelector(selectCart);
  const dispatch = useDispatch();

  const handleRemoveItemFromCart = (id: string) => {
    const confirm = window.confirm('Deseja remover este item?');

    if (confirm) {
      dispatch(removeItemFromCart(id));
    }
  };

  return (
    <S.CartItemContainer>
      {cart.length === 0 && <p>No bets added to cart.</p>}
      {cart.map((item) => (
        <S.CartItem key={item.id}>
          <button onClick={() => handleRemoveItemFromCart(item.id)}>
            <img src={iconTrash} alt='Icon trash' />
          </button>
          <S.BoxInfo color={item.game.color}>
            <span className='numbers'>{item.numbers.toString()}</span>
            <p>
              <strong>{item.game.type}</strong>
              <span className='price'>{formatNumber(item.game.price)}</span>
            </p>
          </S.BoxInfo>
        </S.CartItem>
      ))}
    </S.CartItemContainer>
  );
};
