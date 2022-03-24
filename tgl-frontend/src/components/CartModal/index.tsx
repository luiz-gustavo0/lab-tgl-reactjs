import { ReactNode } from 'react';

type CartModalProps = {
  children: ReactNode;
};

export const CartModal = ({ children }: CartModalProps) => {
  return <>{children}</>;
};
