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
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  place-content: center;

  &::after {
    content: '';
    display: ${(props) => (props.hasError ? 'block' : 'none')};
    width: 20px;
    height: 20px;
    background: url(${alertIconInput}) no-repeat center center;
    position: absolute;
    top: 2.5rem;
    right: 3rem;
    z-index: 10;
  }

  input {
    grid-column: 1;
    grid-row: 1;
    width: 100%;
    height: 4.5rem;
    padding: 0 3rem;
    border: 0;
    background: transparent;
    color: var(--gray-800);
    transition: all 0.2s ease;

    &::placeholder {
      color: var(--gray-500);
      font-weight: bold;
      font-style: italic;
    }

    &:focus {
      outline: none;
    }
  }

  p {
    grid-column: 1;
    grid-row: 2;
    padding-left: 3rem;
    font-size: 1.4rem;
    color: #fe5f55;
    margin-top: 0.5rem;
    transition: all 0.2s ease;

    &:hover {
      display: none;
    }
  }

  @media (max-width: 768px) {
    height: 7rem;
  }
`;
