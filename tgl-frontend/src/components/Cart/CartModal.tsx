import { closeCart, selectCart } from 'features/cart/cartSlice';
import { useMediaQuery } from 'hooks/useMediaQuery';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'store/hooks';
import { Cart } from '.';
import * as S from './styles';

export const CartModal = () => {
  const { isCartOpen } = useAppSelector(selectCart);
  const dispatch = useDispatch();
  const matches = useMediaQuery('(max-width: 800px)');

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    dispatch(closeCart());
  };
  if (matches) {
    return (
      <S.WrapperModalCart isOpen={isCartOpen} onClick={handleClickOutside}>
        <Cart />
      </S.WrapperModalCart>
    );
  } else return null;
};
