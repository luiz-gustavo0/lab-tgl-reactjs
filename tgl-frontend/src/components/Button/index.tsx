import { ReactNode } from 'react';
import * as S from './styles';
interface ButtonProps {
  children: ReactNode;
}

export const Button = ({ children }: ButtonProps) => {
  return (
    <S.ButtonContainer data-cy='button-submit'>{children}</S.ButtonContainer>
  );
};
