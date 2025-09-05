import ingredientsReducer from './ingredientsSlice';
import { fetchIngredients } from './ingredientsSlice';
import { testIngredients } from '../../utils/test-data';

describe('ingredients reducer', () => {
  const initialState = {
    ingredients: [],
    isLoading: false,
    error: null
  };

  it('should return initial state', () => {
    expect(ingredientsReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const result = ingredientsReducer(initialState, action);

    expect(result.isLoading).toBe(true);
    expect(result.error).toBeNull();
  });

  it('should handle fetchIngredients.fulfilled', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: testIngredients
    };

    const result = ingredientsReducer(initialState, action);

    expect(result.isLoading).toBe(false);
    expect(result.ingredients).toEqual(testIngredients);
    expect(result.error).toBeNull();
  });

  it('should handle fetchIngredients.rejected', () => {
    const errorMessage = 'Failed to fetch ingredients';
    const action = {
      type: fetchIngredients.rejected.type,
      payload: errorMessage
    };

    const result = ingredientsReducer(initialState, action);

    expect(result.isLoading).toBe(false);
    expect(result.error).toBe(errorMessage);
    expect(result.ingredients).toEqual([]);
  });
});
