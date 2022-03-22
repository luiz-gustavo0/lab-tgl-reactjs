import { BoxInfo, CartItem, CartItemContainer } from './styles';

import iconTrash from 'img/trash-o.svg';

export const CartItems = () => {
  return (
    <CartItemContainer>
      <div>
        <CartItem>
          <button>
            <img src={iconTrash} alt='Icon trash' />
          </button>
          <BoxInfo>
            <span className='numbers'>1,2,3,4,5,6,7</span>
            <p>
              <strong>Game name</strong>
              <span className='price'>R$ 2,50</span>
            </p>
          </BoxInfo>
        </CartItem>

        <CartItem>
          <button>
            <img src={iconTrash} alt='Icon trash' />
          </button>
          <BoxInfo>
            <span className='numbers'>1,2,3,4,5,6,7</span>
            <p>
              <strong>Game name</strong>
              <span className='price'>R$ 2,50</span>
            </p>
          </BoxInfo>
        </CartItem>

        <CartItem>
          <button>
            <img src={iconTrash} alt='Icon trash' />
          </button>
          <BoxInfo>
            <span className='numbers'>
              1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16
            </span>
            <p>
              <strong>Game name</strong>
              <span className='price'>R$ 2,50</span>
            </p>
          </BoxInfo>
        </CartItem>
      </div>
    </CartItemContainer>
  );
};
