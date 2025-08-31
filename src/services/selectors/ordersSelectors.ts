import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { TOrder } from '@utils-types';

export const selectOrderByNumber =
  (orderNumber: number) =>
  (state: RootState): TOrder | undefined => {
    // Ищем в ленте заказов
    const orderFromFeed = state.orders.feed.orders.find(
      (order) => order.number === orderNumber
    );
    if (orderFromFeed) return orderFromFeed;

    // Ищем в пользовательских заказах
    const orderFromUser = state.orders.userOrders.find(
      (order) => order.number === orderNumber
    );
    return orderFromUser;
  };

export const selectIngredients = (state: RootState) =>
  state.ingredients.ingredients;

export const selectOrderIsLoading = (state: RootState) =>
  state.orders.isLoading;
export const selectCurrentOrder = (state: RootState) =>
  state.orders.currentOrder;
export const selectOrderError = (state: RootState) => state.orders.error;
export const selectUserOrders = (state: RootState) => state.orders.userOrders;
export const selectFeed = (state: RootState) => state.orders.feed;
export const selectFeedOrders = (state: RootState) => state.orders.feed.orders;
export const selectFeedTotal = (state: RootState) => state.orders.feed.total;
export const selectFeedTotalToday = (state: RootState) =>
  state.orders.feed.totalToday;
