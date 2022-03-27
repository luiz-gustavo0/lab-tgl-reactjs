import { useDispatch } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import { useAppSelector } from 'store/hooks';
import { removeItemFromCart, selectCart } from 'features/cart/cartSlice';
import { formatNumber } from 'utils/format';

import * as S from './styles';
import iconTrash from 'img/trash-o.svg';

export const CartItems = () => {
  const { cart } = useAppSelector(selectCart);
  const dispatch = useDispatch();

  const handleRemoveItemFromCart = (id: string) => {
    confirmAlert({
      title: 'Do you want to delete this item?',
      overlayClassName: 'overlay-modal',
      buttons: [
        {
          label: 'Delete',
          onClick: () => {
            dispatch(removeItemFromCart(id));
            toast.success('Game removed from cart.');
          },
          className: 'confirm-buttom',
        },
        {
          label: 'Cancel',
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <>
      <S.CartItemContainer>
        {cart.length === 0 && <p>No bets added to cart.</p>}
        {cart.map((item) => (
          <S.CartItem key={item.id}>
            <button
              onClick={() => {
                handleRemoveItemFromCart(item.id);
              }}
            >
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
    </>
  );
};
