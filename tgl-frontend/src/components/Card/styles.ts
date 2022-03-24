import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  max-width: 35rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;

  @media (max-width: 425px) {
    max-width: 100%;
  }
`;

export const Title = styled.h2`
  font-size: 3.6rem;
  color: var(--gray-800);
  font-style: italic;

  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`;
