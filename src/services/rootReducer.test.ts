import rootReducer from './rootReducer';

describe('rootReducer', () => {
  it('should return initial state for unknown action', () => {
    const result = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(result).toEqual({
      auth: {
        user: null,
        isAuthChecked: false,
        isLoading: false,
        error: null
      },
      burgerConstructor: {
        bun: null,
        ingredients: []
      },
      ingredients: {
        ingredients: [],
        isLoading: false,
        error: null
      },
      orders: {
        userOrders: [],
        currentOrder: null,
        feed: {
          orders: [],
          total: 0,
          totalToday: 0
        },
        isLoading: false,
        error: null
      }
    });
  });
});
