import { RootState } from '../store';

export const selectConstructor = (state: RootState) => state.burgerConstructor;
export const selectConstructorBun = (state: RootState) =>
  state.burgerConstructor.bun;
export const selectConstructorIngredients = (state: RootState) =>
  state.burgerConstructor.ingredients;

// для подсчета ингредиентов
export const selectIngredientsCount = (state: RootState) => {
  const { bun, ingredients } = state.burgerConstructor;

  const counts: { [key: string]: number } = {};

  // булку
  if (bun) {
    counts[bun._id] = 1;
  }

  // начинки и соусы
  ingredients.forEach((ingredient) => {
    counts[ingredient._id] = (counts[ingredient._id] || 0) + 1;
  });

  return counts;
};
