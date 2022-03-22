import styled from 'styled-components';

export const Container = styled.aside`
  margin-top: 4rem;
  width: 32rem;
  height: 48rem;
  background: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: 1rem;
  overflow: hidden;
`;

export const Content = styled.div`
  padding: 3.2rem 1.6rem 0;
  height: 38rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h3 {
    font-size: 2.4rem;
    font-style: italic;
    font-weight: bold;
    text-transform: uppercase;
    color: var(--gray-800);
    margin-bottom: 3.6rem;
  }

  h4 {
    margin: 4rem 0;
    font-size: 2.4rem;
    font-style: italic;
    font-weight: bold;
    color: var(--gray-800);
    text-transform: uppercase;

    span {
      font-style: normal;
      font-weight: lighter;
      margin-left: 3px;
    }
  }
`;

export const Box = styled.div`
  width: 100%;
  height: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gray-100);
  border-top: 1px solid var(--gray-200);

  button {
    font-size: 3.6rem;
    color: var(--green-light);
    font-weight: bold;
    padding: 2rem;
    display: flex;
    align-items: center;
    gap: 1.8rem;
    border: 0;
    background: transparent;

    img {
      width: 2rem;
      height: 2.4rem;
    }
  }
`;

export const CartItemContainer = styled.div`
  flex: 1;
  overflow-y: auto;
`;

export const CartItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.4rem;

  &:not(:last-child) {
    margin-bottom: 3rem;
  }

  button {
    background: none;
    border: 0;
    width: 2rem;
    height: 2.4rem;
  }
`;

type BoxInfoProps = {
  color?: string;
};

export const BoxInfo = styled.div<BoxInfoProps>`
  height: 100%;
  padding: 1.6rem;

  border-left: 4px solid;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;

  p {
    margin-top: 0.6rem;
    font-size: 1.6rem;
  }

  .numbers {
    display: block;
    width: 100%;
    max-width: 19rem;
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--gray-600);
    font-style: italic;
    word-break: break-all;
  }

  .price {
    margin-left: 0.6rem;
    font-weight: normal;
    color: var(--gray-600);
  }

  strong {
    font-style: italic;
  }
`;
