import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import authReducer from './slices/authSlice';
import ingredientsReducer from './slices/ingredientsSlice';
import burgerConstructorReducer from './slices/burgerConstructorSlice';
import ordersReducer from './slices/ordersSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  orders: ordersReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch = () => dispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
