import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeed } from '../../services/slices/ordersSlice';
import {
  selectFeedOrders,
  selectOrderIsLoading
} from '../../services/selectors/ordersSelectors';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(selectFeedOrders);
  const isLoading = useSelector(selectOrderIsLoading);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current && orders.length === 0) {
      console.log('Dispatching fetchFeed...');
      hasFetched.current = true;
      dispatch(fetchFeed());
    }
  }, [dispatch, orders.length]);

  if (isLoading && orders.length === 0) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchFeed())} />
  );
};
