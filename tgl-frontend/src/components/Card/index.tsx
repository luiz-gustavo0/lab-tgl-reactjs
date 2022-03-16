import { ReactNode } from 'react';

import * as S from './styles';

type FormProps = {
  tittle: string;
  children: ReactNode;
};

export const Card = ({ children, tittle }: FormProps) => {
  return (
    <S.Wrapper>
      <S.Title>{tittle}</S.Title>
      {children}
    </S.Wrapper>
  );
};
