import * as S from './styles';

export const Spinner = () => {
  return (
    <S.Wrapper className='lds-ring'>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </S.Wrapper>
  );
};
