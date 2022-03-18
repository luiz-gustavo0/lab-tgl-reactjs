import { FormHTMLAttributes, ReactNode } from 'react';
import * as S from './styles';

interface FromProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
}

export const Form = ({ children, onSubmit }: FromProps) => {
  return <S.Container onSubmit={onSubmit}>{children}</S.Container>;
};
