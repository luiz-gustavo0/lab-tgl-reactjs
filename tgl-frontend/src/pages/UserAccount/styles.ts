import styled from 'styled-components';

export const Content = styled.div`
  margin-top: 7rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  @media (max-width: 800px) {
    align-items: center;
    flex-direction: column;
    gap: 6rem;
  }
`;

export const UserData = styled.div`
  h2 {
    font-size: 2.4rem;
    color: var(--gray-800);
    font-weight: bold;
    font-style: italic;
    text-transform: uppercase;
    margin-bottom: 3rem;
  }

  p {
    font-size: 2rem;
    margin-bottom: 1rem;

    strong {
      font-size: 2.2rem;
    }
  }

  @media (max-width: 800px) {
    h2 {
      text-align: center;
    }

    p {
      font-size: 1.7rem;

      strong {
        font-size: 1.7rem;
      }
    }
  }
`;

export const Avatar = styled.div`
  width: 10rem;
  height: 10rem;
  background: var(--gray-300);
  border-radius: 50%;
  margin-bottom: 3rem;
`;
