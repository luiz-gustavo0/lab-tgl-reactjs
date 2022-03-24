import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 4.2rem;
  a {
    display: inline-block;
    font-size: 3.6rem;
    font-weight: bold;
    font-style: italic;
    background: transparent;
    border: 0;
    color: var(--gray-800);
    display: flex;
    align-items: center;
    gap: 2rem;

    img {
      width: 2.4rem;
      height: 2.4rem;
    }
  }
  @media (max-width: 768px) {
    a {
      font-size: 2.8rem;
    }
  }
`;
