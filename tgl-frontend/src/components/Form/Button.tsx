import { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
};

import { ButtonContainer } from './styles';

export const Button = ({ children }: ButtonProps) => {
  return <ButtonContainer variant={false}>{children}</ButtonContainer>;
};
