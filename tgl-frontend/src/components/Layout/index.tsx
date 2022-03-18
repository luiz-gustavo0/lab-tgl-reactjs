import { Outlet } from 'react-router-dom';

import * as S from './styles';

export const Layout = () => {
  return (
    <S.Wrapper>
      <S.Container>
        <S.Heading>
          <h2>The Greatest App</h2>
          <button type='button'>for</button>
          <h1 className='uppercase'>Lottery</h1>
        </S.Heading>
        <Outlet />
      </S.Container>
    </S.Wrapper>
  );
};
