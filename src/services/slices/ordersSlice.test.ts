import ordersReducer from './ordersSlice';
import { createOrder } from './ordersSlice';
import { testOrder } from '../../utils/test-data';

describe('orders reducer', () => {
  const initialState = {
    userOrders: [],
    currentOrder: null,
    feed: {
      orders: [],
      total: 0,
      totalToday: 0
    },
    isLoading: false,
    error: null
  };

  it('should return initial state', () => {
    expect(ordersReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle createOrder.pending', () => {
    const action = { type: createOrder.pending.type };
    const result = ordersReducer(initialState, action);

    expect(result.isLoading).toBe(true);
    expect(result.error).toBeNull();
  });

  it('should handle createOrder.fulfilled', () => {
    const action = {
      type: createOrder.fulfilled.type,
      payload: testOrder
    };

    const result = ordersReducer(initialState, action);

    expect(result.isLoading).toBe(false);
    expect(result.currentOrder).toEqual(testOrder);
    expect(result.error).toBeNull();
  });

  it('should handle createOrder.rejected', () => {
    const errorMessage = 'Network error';
    const action = {
      type: createOrder.rejected.type,
      payload: errorMessage
    };

    const result = ordersReducer(initialState, action);

    expect(result.isLoading).toBe(false);
    expect(result.error).toBe(errorMessage);
    expect(result.currentOrder).toBeNull();
  });
});
