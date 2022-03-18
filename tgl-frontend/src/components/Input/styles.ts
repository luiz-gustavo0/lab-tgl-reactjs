import styled from 'styled-components';
import alertIconInput from 'img/alert.svg';

type InputProps = {
  hasError?: boolean;
};

export const Wrapper = styled.div<InputProps>`
  width: 100%;
  height: 8rem;
  border-bottom: 2px solid;
  border-bottom-color: ${(props) => (props.hasError ? '#FE5F55' : '#EBEBEB')};
  display: flex;
  align-items: center;
  position: relative;

  &::after {
    content: '';
    display: ${(props) => (props.hasError ? 'block' : 'none')};
    width: 20px;
    height: 20px;
    background: url(${alertIconInput}) no-repeat center center;
    position: absolute;
    right: 3rem;
    z-index: 10;
  }

  input {
    width: 100%;
    height: 4.8rem;
    padding: 0 3rem;
    border: 0;
    background: transparent;
    color: var(--gray-800);

    &::placeholder {
      color: var(--gray-500);
      font-weight: bold;
      font-style: italic;
    }

    &:focus {
      outline: none;
    }
  }
`;
