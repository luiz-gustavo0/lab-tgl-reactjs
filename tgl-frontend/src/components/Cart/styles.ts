import styled from 'styled-components';

export const WrapperModalCart = styled.div<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

export const ButtonCloseCart = styled.button<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  top: 2rem;
  right: 2rem;

  width: 4rem;
  height: 4rem;
  background: var(--gray-50);
  border: 0;
`;

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
  color: string;
};

export const BoxInfo = styled.div<BoxInfoProps>`
  width: 100%;
  height: 100%;
  padding: 1.6rem 1.4rem 1.6rem 1.6rem;

  border-left: 4px solid;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border-left-color: ${(props) => props.color};

  p {
    margin-top: 0.6rem;
    font-size: 1.6rem;
  }

  .numbers {
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    & span {
      font-size: 1.5rem;
      font-weight: bold;
      color: var(--gray-600);
      font-style: italic;
    }
    /* word-break: break-all; */
  }

  .price {
    margin-left: 0.6rem;
    font-weight: normal;
    color: var(--gray-600);
  }

  strong {
    font-style: italic;
    color: ${(props) => props.color};
  }
`;
