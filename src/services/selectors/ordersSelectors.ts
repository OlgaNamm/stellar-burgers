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
