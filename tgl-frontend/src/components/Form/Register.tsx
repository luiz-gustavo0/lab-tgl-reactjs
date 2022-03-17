import { Card } from 'components/Card';
import { Button } from './Button';
import { Input } from './Input';
import { CustomLink } from 'components/CustomLink';
import * as S from './styles';

import iconArrowRight from 'img/arrow-right.svg';

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

      <CustomLink href='/auth' text='Back' />
    </Card>
  );
};
