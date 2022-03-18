import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
} from 'react';
import { FieldError } from 'react-hook-form';
import * as S from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  label?: string;
  error?: FieldError;
}

export const InputBase: ForwardRefRenderFunction<
  HTMLInputElement,
  InputProps
> = ({ name, label, error = null, ...props }, ref) => {
  return (
    <S.Wrapper hasError={!!error}>
      <input id={name} name={name} ref={ref} {...props} />
    </S.Wrapper>
  );
};

export const Input = forwardRef(InputBase);
