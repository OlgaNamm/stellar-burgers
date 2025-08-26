import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from '../../services/store';
import {
  selectConstructorBun,
  selectConstructorIngredients
} from '../../services/selectors/constructorSelectors';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const bun = useSelector(selectConstructorBun);
  const ingredients = useSelector(selectConstructorIngredients);

  const safeConstructorItems = {
    bun: bun || null,
    ingredients: ingredients || []
  };

  const orderRequest = false;
  const orderModalData = null;

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!safeConstructorItems.bun || orderRequest) return;
    // TODO: логика оформления заказа
  };

  const closeOrderModal = () => {};

  const price = useMemo(
    () =>
      (safeConstructorItems.bun ? safeConstructorItems.bun.price * 2 : 0) +
      safeConstructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [safeConstructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={safeConstructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
