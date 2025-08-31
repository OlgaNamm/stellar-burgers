import { FC, useEffect, useMemo, useRef } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { useLocation, useParams } from 'react-router-dom';
import { fetchFeed, fetchUserOrders } from '../../services/slices/ordersSlice';
import {
  selectOrderByNumber,
  selectIngredients
} from '../../services/selectors/ordersSelectors';

export const OrderInfo: FC = () => {
  const { number } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const initRef = useRef<boolean>(true);

  const ingredients = useSelector(selectIngredients);
  const orderNumber = number ? parseInt(number) : null;
  const orderData = useSelector(selectOrderByNumber(orderNumber!));

  useEffect(() => {
    if (!initRef.current) return;

    // Если заказ не найден, загружаем соответствующие данные
    if (!orderData && orderNumber) {
      const isProfilePage = location.pathname.includes('profile');
      if (isProfilePage) {
        dispatch(fetchUserOrders());
      } else {
        //dispatch(fetchFeed());
      }
    }

    return () => {
      initRef.current = false;
    };
  }, [orderData, orderNumber, dispatch, location.pathname]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return (
    <>
      {!location.state && (
        <span className='text text_type_main-large'>{`#${orderInfo.number}`}</span>
      )}
      <OrderInfoUI orderInfo={orderInfo} />
    </>
  );
};
