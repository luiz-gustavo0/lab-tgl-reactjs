import * as S from './styles';

type SpinnerProps = {
  full: boolean;
};

export const Spinner = ({ full }: SpinnerProps) => {
  return (
    <S.Wrapper full={full}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </S.Wrapper>
  );
};
