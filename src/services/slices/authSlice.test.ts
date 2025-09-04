import authReducer from './authSlice';
import { loginUser } from './authSlice';
import { testUser } from '../../utils/test-data';

describe('auth reducer', () => {
  const initialState = {
    user: null,
    isAuthChecked: false,
    isLoading: false,
    error: null
  };

  it('should return initial state', () => {
    expect(authReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle loginUser.pending', () => {
    const action = { type: loginUser.pending.type };
    const result = authReducer(initialState, action);

    expect(result.isLoading).toBe(true);
    expect(result.error).toBeNull();
  });

  it('should handle loginUser.fulfilled', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: testUser
    };

    const result = authReducer(initialState, action);

    expect(result.isLoading).toBe(false);
    expect(result.user).toEqual(testUser);
    expect(result.error).toBeNull();
  });

  it('should handle loginUser.rejected', () => {
    const errorMessage = 'Authentication failed';
    const action = {
      type: loginUser.rejected.type,
      payload: errorMessage
    };

    const result = authReducer(initialState, action);

    expect(result.isLoading).toBe(false);
    expect(result.error).toBe(errorMessage);
    expect(result.user).toBeNull();
  });
});
