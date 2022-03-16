import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 8rem;
  border-bottom: 2px solid var(--gray-300);
  display: flex;
  align-items: center;

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
