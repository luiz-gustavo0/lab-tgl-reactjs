import { Link, useNavigate } from 'react-router-dom';
import * as S from './styles';

import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUserData, setIsAuthenticated } from 'features/auth/loginSlice';

import iconMenu from 'img/menu.svg';
import iconCart from 'img/cart-black.svg';
import iconCloseMenu from 'img/clear.svg';
import iconArrowRightBlack from 'img/arrow-right-black.svg';
import { openCart } from 'features/cart/cartSlice';
import { useAppSelector } from 'store/hooks';
import { selectUser } from 'features/user/userSlice';

export const Header = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const user = useAppSelector(getUserData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem('tgl:token');
    localStorage.removeItem('tgl:user');
    dispatch(setIsAuthenticated(false));
    navigate('/auth');
  }, []);

  const handleOpenMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  return (
    <S.Header>
      <S.Container>
        <S.ButtonMenu onClick={handleOpenMenu}>
          {isOpenMenu ? (
            <img src={iconCloseMenu} alt='Close Menu' />
          ) : (
            <img src={iconMenu} alt='Abrir Menu' />
          )}
        </S.ButtonMenu>
        <S.Logo>
          <span>TGL</span>
        </S.Logo>
        <S.Navigation isOpen={isOpenMenu}>
          <ul>
            <li>
              <Link to='/' onClick={handleOpenMenu}>
                Home
              </Link>
            </li>
            {user?.is_admin && (
              <li>
                <Link to='/new-game' onClick={handleOpenMenu}>
                  New Game
                </Link>
              </li>
            )}
            <li>
              <Link to='/' onClick={handleOpenMenu}>
                Account
              </Link>
            </li>
            <li>
              <button onClick={logout}>
                Log out
                <img src={iconArrowRightBlack} alt='Arrow right icon' />
              </button>
            </li>
          </ul>
        </S.Navigation>
        <S.ButtonCart onClick={() => dispatch(openCart(true))}>
          <img src={iconCart} alt='Icon cart' />
        </S.ButtonCart>
      </S.Container>
    </S.Header>
  );
};

export default Header;
