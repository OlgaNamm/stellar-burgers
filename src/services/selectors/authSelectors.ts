import { RootState } from '../store';

export const selectErrorAuth = (state: RootState) => state.auth.error;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectIsAuthChecked = (state: RootState) =>
  state.auth.isAuthChecked;
