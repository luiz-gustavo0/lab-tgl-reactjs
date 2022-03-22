import styled from 'styled-components';

export const Container = styled.main`
  width: 100%;
  max-width: 118rem;
  margin-inline: auto;
  padding: 0 2rem;

  display: flex;
  gap: 4rem;
`;

export const ContentGame = styled.section`
  flex: 1;

  h2 {
    margin-top: 7rem;
    font-size: 2.4rem;
    color: var(--gray-800);
    font-weight: bold;
    font-style: italic;
    text-transform: uppercase;

    .game-name {
      font-weight: lighter;
    }
  }
`;

export const ChooseGame = styled.div`
  h4 {
    font-size: 1.7rem;
    font-style: italic;
    color: var(--gray-600);
    font-weight: bold;
    margin-top: 3rem;
  }

  div {
    margin-top: 2rem;
    display: flex;
    align-items: center;
    gap: 2.4rem;
  }

  .error {
    color: #f2545b;
    text-transform: uppercase;
    font-weight: bold;
  }
`;

export const GameDescription = styled.div`
  margin-top: 3rem;
  max-width: 64.8rem;

  h4,
  p {
    font-size: 1.7rem;
    line-height: 2.4rem;
    color: var(--gray-600);
    font-style: italic;
  }

  h4 {
    font-weight: bold;
  }
`;

export const NumbersContainer = styled.div`
  margin-top: 4rem;
  width: 100%;
  max-width: 68rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem 1.4rem;
`;

type ButtonNumberProps = {
  isSelected: boolean;
  color?: string;
};

export const ButtonNumber = styled.button<ButtonNumberProps>`
  width: 63px;
  height: 65px;
  font-size: 2rem;
  line-height: 2.4rem;
  color: #fff;
  background: ${(props) => (props.isSelected ? props.color : '#adc0c4')};
  border-radius: 50%;
  border: 0;
`;

export const GameControllers = styled.div`
  width: 100%;
  max-width: 68rem;
  margin-top: 4rem;
  display: flex;
  align-items: center;
  gap: 2.4rem;
`;

type ButtonProps = {
  outilined?: boolean;
};

export const Button = styled.button<ButtonProps>`
  background: ${(props) => (props.outilined ? '#27C383' : 'transparent')};
  border: 1px solid var(--green-light);
  height: 5.2rem;
  width: ${(props) => props.outilined && '20rem'};
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => (props.outilined ? '2.8rem' : 0)};
  border-radius: 1rem;
  color: ${(props) => (props.outilined ? '#fff' : '#27C383')};
  font-weight: 500;
  transition: all 0.2s ease;
  margin-left: ${(props) => props.outilined && 'auto'};

  &:hover {
    filter: brightness(0.9);
  }
`;
