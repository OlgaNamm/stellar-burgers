import constructorReducer from './burgerConstructorSlice';
import {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} from './burgerConstructorSlice';
import {
  testIngredients,
  testConstructorIngredient
} from '../../utils/test-data';

describe('constructor reducer', () => {
  const initialState = {
    bun: null,
    ingredients: []
  };

  it('should return initial state', () => {
    expect(constructorReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle addIngredient for bun', () => {
    const bun = testConstructorIngredient(testIngredients[0], 'bun-uuid');
    const action = addIngredient(bun);

    const result = constructorReducer(initialState, action);

    expect(result.bun).toEqual(bun);
    expect(result.ingredients).toHaveLength(0);
  });

  it('should handle addIngredient for non-bun', () => {
    const ingredient = testConstructorIngredient(
      testIngredients[1],
      'ing1-uuid'
    );
    const action = addIngredient(ingredient);

    const result = constructorReducer(initialState, action);

    expect(result.bun).toBeNull();
    expect(result.ingredients).toHaveLength(1);
    expect(result.ingredients[0]).toEqual(ingredient);
  });

  it('should handle removeIngredient', () => {
    const stateWithIngredients = {
      bun: null,
      ingredients: [
        testConstructorIngredient(testIngredients[1], 'uuid1'),
        testConstructorIngredient(testIngredients[2], 'uuid2')
      ]
    };

    const action = removeIngredient('uuid1');
    const result = constructorReducer(stateWithIngredients, action);

    expect(result.ingredients).toHaveLength(1);
    expect(result.ingredients[0]._id).toBe(testIngredients[2]._id);
  });

  it('should handle moveIngredient', () => {
    const stateWithIngredients = {
      bun: null,
      ingredients: [
        testConstructorIngredient(testIngredients[1], 'uuid1'),
        testConstructorIngredient(testIngredients[2], 'uuid2'),
        testConstructorIngredient(testIngredients[1], 'uuid3')
      ]
    };

    const action = moveIngredient({ fromIndex: 0, toIndex: 2 });
    const result = constructorReducer(stateWithIngredients, action);

    expect(result.ingredients[0]._id).toBe(testIngredients[2]._id);
    expect(result.ingredients[1]._id).toBe(testIngredients[1]._id);
    expect(result.ingredients[2]._id).toBe(testIngredients[1]._id);
  });

  it('should handle clearConstructor', () => {
    const stateWithData = {
      bun: testConstructorIngredient(testIngredients[0], 'bun-uuid'),
      ingredients: [testConstructorIngredient(testIngredients[1], 'uuid1')]
    };

    const action = clearConstructor();
    const result = constructorReducer(stateWithData, action);

    expect(result.bun).toBeNull();
    expect(result.ingredients).toHaveLength(0);
  });
});
