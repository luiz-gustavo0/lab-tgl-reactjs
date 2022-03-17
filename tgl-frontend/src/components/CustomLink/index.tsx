import { Link } from 'react-router-dom';

import * as S from './styles';

import iconArrowRightBlack from 'img/arrow-right-black.svg';
import iconArrowLeft from 'img/arrow-thin-left.svg';

type CustomLinkProps = {
  href: string;
  text: string;
};

export const CustomLink = ({ href, text }: CustomLinkProps) => {
  return (
    <S.Wrapper>
      {text.toLowerCase() === 'back' ? (
        <Link to={href}>
          <img src={iconArrowLeft} alt='Arrow right icon' />
          {text}
        </Link>
      ) : (
        <Link to={href}>
          {text}
          <img src={iconArrowRightBlack} alt='Arrow right icon' />
        </Link>
      )}
    </S.Wrapper>
  );
};
