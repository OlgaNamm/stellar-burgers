import { FC, memo, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { addIngredient } from '../../services/slices/burgerConstructorSlice';
import { TIngredient, TConstructorIngredient } from '../../utils/types';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const counterRef = useRef(0);

    const prepareIngredient = useCallback(
      (ingredient: TIngredient): TConstructorIngredient => ({
        ...ingredient,
        id: `${ingredient._id}-${Date.now()}-${counterRef.current++}`
      }),
      []
    );

    const handleAdd = useCallback(() => {
      try {
        const constructorIngredient = prepareIngredient(ingredient);
        console.log('Adding ingredient:', constructorIngredient);
        dispatch(addIngredient(constructorIngredient));
      } catch (error) {
        console.error('Error adding ingredient:', error);
      }
    }, [ingredient, dispatch, prepareIngredient]);

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
