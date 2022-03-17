import { ReactNode } from 'react';
import { ButtonContainer } from './styles';
interface ButtonProps {
  children: ReactNode;
}

export const Button = ({ children }: ButtonProps) => {
  return <ButtonContainer>{children}</ButtonContainer>;
};
