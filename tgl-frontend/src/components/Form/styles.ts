import styled from 'styled-components';

export const FormContainer = styled.form`
  width: 100%;
  background: var(--white);
  box-shadow: 0px 3px 25px #00000014;
  border: 1px solid var(--gray-300);
  border-radius: 1.4rem;
  padding-bottom: 3rem;
  overflow: hidden;

  display: flex;
  flex-direction: column;

  a {
    display: inline-block;
    text-align: right;
    font-style: italic;
    color: var(--gray-400);
    margin-right: 2rem;
    margin-top: 2.6rem;
  }

  button {
    margin-top: 3rem;
  }
`;

interface IButtonProps {
  variant: boolean;
}

export const ButtonContainer = styled.button<IButtonProps>`
  padding: 0.8rem 2rem;
  color: ${(props) => (props.variant ? '#707070' : '#B5C401')};
  font-size: 3.6rem;
  font-weight: bold;
  font-style: italic;
  background: transparent;
  border: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  img {
    width: 2.4rem;
    height: 2.4rem;
  }
`;
