import { Card } from 'components/Card';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import { Input } from './Input';

import iconArrowRight from '../../img/arrow-right.svg';
import iconArrowRightBlack from '../../img/arrow-right-black.svg';

import * as S from './styles';

export const Login = () => {
  return (
    <Card tittle='Authentication'>
      <S.FormContainer>
        <Input />
        <Input />
        <Link to='/'>I forgot my password</Link>
        <Button>
          Log In
          <img src={iconArrowRight} alt='Arrow right icon' />
        </Button>
      </S.FormContainer>

      <S.ButtonContainer variant>
        Sign Up
        <img src={iconArrowRightBlack} alt='Arrow right icon' />
      </S.ButtonContainer>
    </Card>
  );
};
