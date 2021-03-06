import styled from 'styled-components';

export const Navigation = styled.nav`
  width: 100%;
  margin-top: 7rem;
  display: flex;
  align-items: center;

  h2 {
    margin-right: 4.5rem;
    font-size: 2.4rem;
    font-style: italic;
    text-transform: uppercase;
    color: var(--gray-800);
  }

  a {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 2.4rem;
    font-style: italic;
    font-weight: bold;
    color: var(--green-limon);

    img {
      width: 24px;
      height: 20px;
    }
  }

  @media (max-width: 900px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-gap: 2rem;

    h2 {
      grid-column: 1 / 3;
    }

    a {
      grid-row: 1;
      grid-column: 3 / -1;
    }
  }

  @media (max-width: 500px) {
    h2 {
      font-size: 1.8rem;
    }
    a {
      font-size: 1.6rem;

      img {
        width: 16px;
        height: 16px;
      }
    }
  }
`;

export const Filters = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  span {
    font-style: italic;
  }

  @media (max-width: 900px) {
    grid-row: 2;

    grid-column: 1 / -1;
    height: 3.4rem;
  }

  @media (max-width: 500px) {
    gap: 1rem;
    span {
      display: none;
    }
  }
`;

type LabelProps = {
  color: string;
};

export const Label = styled.label<LabelProps>`
  cursor: pointer;
  span {
    height: 3.4rem;
    width: 11rem;
    border-radius: 100px;
    background: #fff;
    font-size: 1.4rem;
    font-weight: bold;
    border-width: 2px;
    border-style: solid;
    border-color: ${(props) => props.color};
    color: ${(props) => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
  }

  input[type='checkbox'] {
    display: none;
  }

  input[type='checkbox']:checked + span {
    background: ${(props) => props.color};
    color: var(--white);
  }

  @media (max-width: 500px) {
    width: 10rem;
  }
`;

type ButtonProps = {
  color: string;
  isSelected: boolean;
};

export const Button = styled.button<ButtonProps>`
  height: 3.4rem;
  width: 11rem;
  border-radius: 100px;
  background: #fff;
  font-size: 1.4rem;
  font-weight: bold;
  border-width: 2px;
  border-style: solid;
  transition: all 0.2s ease;
  color: ${(props) => (props.isSelected ? '#fff' : props.color)};
  border-color: ${(props) => props.color};
  background: ${(props) => (props.isSelected ? props.color : '#fff')};

  @media (max-width: 500px) {
    width: 10rem;
  }
`;

export const GamesContainer = styled.div`
  margin: 3.6rem 0;

  span {
    display: block;
    font-size: 2rem;
    font-style: italic;
    text-align: center;
    margin-top: 8rem;
  }
`;

type GameProps = {
  color?: string;
};

export const Game = styled.div<GameProps>`
  margin-bottom: 3rem;
  padding-left: 1.6rem;
  position: relative;

  &::after {
    content: '';
    display: block;
    width: 6px;
    height: 100%;
    background: ${(props) => (props.color ? props.color : '#535351')};
    position: absolute;
    top: 0;
    left: 0;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  p:not(:last-child) {
    margin-bottom: 1rem;
  }

  .game-number,
  .game-name {
    font-size: 2rem;
    font-style: italic;
    font-weight: bold;
  }

  .game-number {
    color: var(--gray-800);
  }

  .game-name {
    color: ${(props) => props.color};
  }

  @media (max-width: 500px) {
    p {
      font-size: 1.6rem;
    }

    .game-number,
    .game-name,
    .game-price {
      font-size: 1.6rem;
    }
  }
`;
