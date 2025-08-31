import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectConstructorBun,
  selectConstructorIngredients
} from '../../services/selectors/constructorSelectors';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  createOrder,
  clearCurrentOrder
} from '../../services/slices/ordersSlice';
import { clearConstructor } from '../../services/slices/burgerConstructorSlice';
import {
  selectOrderIsLoading,
  selectCurrentOrder
} from '../../services/selectors/ordersSelectors';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const bun = useSelector(selectConstructorBun);
  const ingredients = useSelector(selectConstructorIngredients);
  const isLoading = useSelector(selectOrderIsLoading);
  const currentOrder = useSelector(selectCurrentOrder);

  const safeConstructorItems = {
    bun: bun || null,
    ingredients: ingredients || []
  };

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!safeConstructorItems.bun || isLoading) return;

    const ingredientIds = [
      safeConstructorItems.bun._id,
      ...safeConstructorItems.ingredients.map((i) => i._id),
      safeConstructorItems.bun._id
    ];

    dispatch(createOrder(ingredientIds))
      .unwrap()
      .then(() => {
        dispatch(clearConstructor());
      })
      .catch((error) => {
        console.error('Ошибка оформления заказа:', error);
      });
  };

  const closeOrderModal = () => {
    dispatch(clearCurrentOrder());
  };

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
      orderRequest={isLoading}
      constructorItems={safeConstructorItems}
      orderModalData={currentOrder}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
