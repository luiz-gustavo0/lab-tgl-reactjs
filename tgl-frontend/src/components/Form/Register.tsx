import { Card } from 'components/Card';
import { Input } from 'components/Input';
import { Button } from './Button';
import * as S from './styles';

import iconArrowRight from '../../img/arrow-right.svg';
import iconArrowLeft from '../../img/arrow-thin-left.svg';

export const Register = () => {
  return (
    <Card tittle='Registration'>
      <S.FormContainer>
        <Input />
        <Input />
        <Input />
        <Button>
          Register
          <img src={iconArrowRight} alt='Arrow right icon' />
        </Button>
      </S.FormContainer>

      <S.ButtonContainer variant>
        <img src={iconArrowLeft} alt='Arrow left icon' />
        Back
      </S.ButtonContainer>
    </Card>
  );
};
