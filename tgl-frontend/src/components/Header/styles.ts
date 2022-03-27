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
  position: relative;

  @media (max-width: 800px) {
    justify-content: space-between;
  }
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

  @media (max-width: 800px) {
    margin-right: 0;
  }
`;

type NavigationProps = {
  isOpen: boolean;
};

export const Navigation = styled.nav<NavigationProps>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  ul {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 4rem;

    & li:first-child {
      margin-right: auto;
    }

    & li:nth-child(2) {
      margin-left: auto;
    }
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

  @media (max-width: 800px) {
    display: ${(props) => (props.isOpen ? 'flex' : 'none')};
    align-items: flex-start;
    position: absolute;
    background: var(--gray-50);
    top: 0;
    left: 0;

    width: 100%;
    height: 100vh;
    z-index: 10;

    ul {
      flex-direction: column;
      gap: 2rem;
      margin-top: 10rem;

      & li:first-child {
        margin-right: 0;
      }

      & li:nth-child(2) {
        margin-left: 0;
      }
    }

    button img {
      display: none;
    }

    a:hover {
      text-decoration: underline;
    }
  }
`;

export const ButtonMenu = styled.button`
  display: none;

  width: 32px;
  height: 32px;
  background: transparent;
  border: 0;
  z-index: 20;

  @media (max-width: 800px) {
    display: block;
  }
`;

export const ButtonCart = styled.button`
  display: none;
  width: 32px;
  height: 32px;
  background: transparent;
  border: 0;

  @media (max-width: 800px) {
    display: block;
  }
`;
