import { combineReducers } from 'redux';
import authReducer from './slices/authSlice';
import burgerConstructorReducer from './slices/burgerConstructorSlice';
import ingredientsReducer from './slices/ingredientsSlice';
import ordersReducer from './slices/ordersSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredients: ingredientsReducer,
  orders: ordersReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
