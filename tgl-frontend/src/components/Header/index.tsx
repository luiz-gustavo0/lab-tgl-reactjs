import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'components/Button';
import * as S from './styles';

import iconArrowRightBlack from 'img/arrow-right-black.svg';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setIsAuthenticated } from 'features/auth/loginSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem('tgl:token');
    dispatch(setIsAuthenticated(false));
    navigate('/auth');
  }, []);

  return (
    <S.Header>
      <S.Container>
        <S.Logo>
          <span>TGL</span>
        </S.Logo>
        <S.Navigation>
          <Link to='/'>Home</Link>
          <ul>
            <li>
              <Link to='/'>Account</Link>
            </li>
            <li>
              <button onClick={logout}>
                Log out
                <img src={iconArrowRightBlack} alt='Arrow right icon' />
              </button>
            </li>
          </ul>
        </S.Navigation>
      </S.Container>
    </S.Header>
  );
};

export default Header;
