import styled from 'styled-components';

export const Wrapper = styled.div<{ full: boolean }>`
  display: inline-block;
  position: relative;
  width: ${(props) => (props.full ? '100%' : '24px')};
  height: ${(props) => (props.full ? '100vh' : '24px')};

  display: flex;
  align-items: center;
  justify-content: center;

  & div {
    position: absolute;
    width: ${(props) => (props.full ? '50px' : '20px')};
    height: ${(props) => (props.full ? '50px' : '20px')};

    border: 2px solid var(--green-limon);
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: var(--green-limon) transparent transparent transparent;
  }
  & div:nth-child(1) {
    animation-delay: -0.45s;
  }
  & div:nth-child(2) {
    animation-delay: -0.3s;
  }
  & div:nth-child(3) {
    animation-delay: -0.15s;
  }

  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
