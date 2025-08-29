import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeed } from '../../services/slices/ordersSlice'; // Импортируем правильный экшен

export const Feed: FC = () => {
  const dispatch = useDispatch();
  // Получаем все заказы из фида, а не только пользовательские
  const orders: TOrder[] = useSelector(
    (state) => state.orders.feed.orders || []
  );
  const isLoading = useSelector((state) => state.orders.isLoading);

  useEffect(() => {
    dispatch(fetchFeed()); // Используем экшен из слайса
  }, [dispatch]);

  if (isLoading || !orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchFeed())} />
  );
};
