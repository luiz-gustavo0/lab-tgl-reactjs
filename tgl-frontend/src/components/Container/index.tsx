import { ReactNode } from 'react';
import * as S from './styles';

type ContianerProps = {
  children: ReactNode;
};

export const Container = ({ children }: ContianerProps) => {
  return <S.Wrapper>{children}</S.Wrapper>;
};
