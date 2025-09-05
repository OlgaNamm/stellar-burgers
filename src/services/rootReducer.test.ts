import rootReducer from './rootReducer';
import { initialState as authInitialState } from './slices/authSlice';
import { initialState as constructorInitialState } from './slices/burgerConstructorSlice';
import { initialState as ingredientsInitialState } from './slices/ingredientsSlice';
import { initialState as ordersInitialState } from './slices/ordersSlice';

describe('rootReducer', () => {
  it('should return initial state for unknown action', () => {
    const result = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(result).toEqual({
      auth: authInitialState,
      burgerConstructor: constructorInitialState,
      ingredients: ingredientsInitialState,
      orders: ordersInitialState
    });
  });
});
