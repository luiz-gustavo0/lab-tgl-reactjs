import styled from 'styled-components';

export const Header = styled.header`
  height: 8rem;
  border-bottom: 2px solid var(--gray-300);
`;

export const Container = styled.div`
  width: 100%;
  max-width: 118rem;
  margin-inline: auto;
  padding: 0 2rem;

  display: flex;
  align-items: center;
`;

export const Logo = styled.div`
  width: 86px;
  height: 100%;
  margin-right: 7rem;

  &::after {
    content: '';
    display: block;
    background: var(--green-limon);
    width: 10rem;
    height: 0.7rem;
    border-radius: 0.6rem;
    bottom: -4px;
    left: -5px;
    position: relative;
  }

  span {
    font-size: 4.4rem;
    line-height: 7rem;
    text-align: center;
    color: var(--gray-600);
    font-weight: bold;
    font-style: italic;
  }
`;

export const Navigation = styled.nav`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ul {
    display: flex;
    align-items: center;
    gap: 4rem;
  }

  a {
    display: block;
  }

  a,
  button {
    height: 100%;
    color: var(--gray-600);
    font-size: 2rem;
    line-height: 7rem;
    font-weight: bold;
    font-style: italic;
  }

  button {
    display: flex;
    align-items: center;
    gap: 1rem;
    border: 0;
    background: transparent;

    img {
      width: 21px;
      height: 17px;
    }
  }
`;
