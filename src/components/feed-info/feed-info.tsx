import { FC } from 'react';
import { useSelector } from '../../services/store';
import { TOrder, TOrdersData } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders: TOrder[] = useSelector(
    (state) => state.orders.feed.orders || []
  );
  const feed = useSelector((state) => state.orders.feed);

  const readyOrders = getOrders(orders, 'done');
  const pendingOrders = getOrders(orders, 'pending');

  // cоздаем чистый объект TOrdersData
  const cleanFeed: TOrdersData = {
    orders: feed.orders,
    total: feed.total,
    totalToday: feed.totalToday
  };

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={cleanFeed}
    />
  );
};
