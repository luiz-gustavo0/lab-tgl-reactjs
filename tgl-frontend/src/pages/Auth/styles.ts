import styled from 'styled-components';

export const Wrapper = styled.main`
  width: 100%;
  max-width: 118rem;
  height: 100vh;
  margin: 0 auto;
  padding: 0 2rem;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 108rem;
  padding: 0 4rem;
  display: flex;
  justify-content: space-between;
`;

export const Heading = styled.div`
  width: 100%;
  max-width: 40rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;

  h2 {
    text-transform: capitalize;
    font-size: 6.4rem;
    width: 100%;
    max-width: 7ch;
    text-align: center;
    font-style: italic;
    color: var(--gray-800);
  }

  h1 {
    font-size: 8.4rem;
    text-transform: uppercase;
    font-style: italic;
    max-width: 100%;
    color: var(--gray-800);
  }

  button {
    width: 14.4rem;
    background: var(--green-limon);
    border: 0;
    border-radius: 100px;
    height: 4rem;
    font-size: 2.2rem;
    color: var(--white);
    font-style: italic;
    font-weight: bold;
  }
`;
