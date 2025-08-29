import { FC, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectConstructorBun,
  selectConstructorIngredients
} from '../../services/selectors/constructorSelectors';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { orderBurgerApi } from '../../utils/burger-api';
import { clearConstructor } from '../../services/slices/burgerConstructorSlice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const bun = useSelector(selectConstructorBun);
  const ingredients = useSelector(selectConstructorIngredients);

  const [orderRequest, setOrderRequest] = useState(false);
  const [orderModalData, setOrderModalData] = useState<any>(null);

  const safeConstructorItems = {
    bun: bun || null,
    ingredients: ingredients || []
  };

  const onOrderClick = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!safeConstructorItems.bun || orderRequest) return;

    try {
      setOrderRequest(true);

      const ingredientIds = [
        safeConstructorItems.bun._id,
        ...safeConstructorItems.ingredients.map((i) => i._id),
        safeConstructorItems.bun._id
      ];

      const orderData = await orderBurgerApi(ingredientIds);
      setOrderModalData(orderData.order);

      dispatch(clearConstructor());
    } catch (error) {
      console.error('Ошибка оформления заказа:', error);
    } finally {
      setOrderRequest(false);
    }
  };

  const closeOrderModal = () => {
    setOrderModalData(null);
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
      orderRequest={orderRequest}
      constructorItems={safeConstructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
