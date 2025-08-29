import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { loginUser, clearError } from '../../services/slices/authSlice';
import {
  selectErrorAuth,
  selectIsLoading
} from '../../services/selectors/authSelectors';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const dispatch = useDispatch();

  const error = useSelector(selectErrorAuth);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(clearError());
    setLocalError('');
  }, [dispatch]);

  // Очищаем пароль при размонтировании компонента
  useEffect(
    () => () => {
      setPassword('');
      dispatch(clearError());
      setLocalError('');
    },
    [dispatch, setPassword]
  );

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    setLocalError('');
    dispatch(loginUser({ email, password }));
  };

  return (
    <LoginUI
      errorText={localError || error || ''} // Сначала локальные ошибки, потом серверные
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
};
