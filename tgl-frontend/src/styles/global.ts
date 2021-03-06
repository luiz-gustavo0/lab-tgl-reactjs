import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --white: #FFFFFF;
    --gray-50: #F7F7F7;
    --gray-100: #F4F4F4;
    --gray-300: #EBEBEB;
    --gray-200: #E2E2E2;
    --gray-300: #DDDDDD;
    --gray-400: #C1C1C1;
    --gray-500: #9D9D9D;
    --gray-600: #868686;
    --gray-700: #888888;
    --gray-800: #707070;
    --gray-900: #535351;

    --green-light: #27C383;
    --green-limon: #B5C401;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Helvetica Neue', sans-serif;
  }

  html {
    font-size: 62.5%;
  }

  body {
    width: 100%;
    height: 100vh;
    font-size: 1.7rem;
    color: var(--gray-600);
    background: var(--gray-50);
  }

  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  input, button {
    font-family: inherit;
    font-size: 1.7rem;
  }

  button {
    cursor: pointer;
  }

  .overlay-modal {
    background: rgba(0, 0, 0, 0.7);
    padding: 2rem;
  }

  .react-confirm-alert {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .react-confirm-alert-body {
    background: var(--gray-50);
    width: 100%;
    max-width: 50rem;
    height: 18rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    h1 {
      font-size: 2.2rem;
      color: var(--gray-800);
    }
  }

  .react-confirm-alert-button-group {
   button {
     width: 13rem;
      height: 4rem;
      font-size: 1.7rem;
      transition: all .2s ease;

      &.confirm-buttom {
        background: #f2545b;
      }

      &:hover {
        filter: brightness(.8);
      }
    }
  }

  @media(max-width: 768px) {
    body {
      font-size: 1.6rem;
    }
  }
`;
