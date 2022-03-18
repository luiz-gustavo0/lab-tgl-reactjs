import styled from 'styled-components';

export const Container = styled.form`
  width: 100%;
  background: var(--white);
  box-shadow: 0px 3px 25px #00000014;
  border: 1px solid var(--gray-300);
  border-radius: 1.4rem;
  padding-bottom: 2rem;
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
