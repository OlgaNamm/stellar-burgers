import { FC, memo } from 'react';
import styles from './feed.module.css';
import { FeedUIProps } from './type';
import { FeedInfoUI } from '../../feed-info/feed-info';
import { OrdersListUI } from '../../orders-list/orders-list';
import { RefreshButton } from '@zlden/react-developer-burger-ui-components';

export const FeedUI: FC<FeedUIProps> = memo(({ orders, handleGetFeeds }) => {
  const readyOrders = orders
    .filter((order) => order.status === 'done')
    .map((order) => order.number)
    .slice(0, 10); // ограничиваем или нет?

  const pendingOrders = orders
    .filter((order) => order.status === 'pending')
    .map((order) => order.number)
    .slice(0, 10);

  const feedData = {
    total: orders.length,
    totalToday: orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      const today = new Date();
      return orderDate.toDateString() === today.toDateString();
    }).length
  };

  return (
    <main className={styles.containerMain}>
      <div className={`${styles.titleBox} mt-10 mb-5`}>
        <h1 className={`${styles.title} text text_type_main-large`}>
          Лента заказов
        </h1>
        <RefreshButton
          text='Обновить'
          onClick={handleGetFeeds}
          extraClass={'ml-30'}
        />
      </div>
      <div className={styles.main}>
        <div className={styles.columnOrders}>
          <OrdersListUI orderByDate={orders} />
        </div>
        <div className={styles.columnInfo}>
          <FeedInfoUI
            feed={feedData}
            readyOrders={readyOrders}
            pendingOrders={pendingOrders}
          />
        </div>
      </div>
    </main>
  );
});
