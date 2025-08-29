import { FC, SyntheticEvent, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { LoginUI } from '@ui-pages';
import { loginUser, clearError } from '../../services/slices/authSlice';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errorClearedRef = useRef(false); // ← Флаг для отслеживания очистки

  const { error, user, isLoading } = useSelector((state) => state.auth);
  const [displayError, setDisplayError] = useState('');

  useEffect(() => {
    console.log('=== LOGIN COMPONENT ===');
    console.log('Redux error:', error);
    console.log('Display error:', displayError);
    console.log('User:', user);
  }, [error, displayError, user]);

  useEffect(() => {
    console.log('Clearing error on mount');
    dispatch(clearError());
    errorClearedRef.current = true;
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setDisplayError(error);
      errorClearedRef.current = false;
    }
  }, [error]);

  useEffect(() => {
    if (user && displayError) {
      console.log(
        'User authenticated but error still displayed, forcing clear'
      );
      setDisplayError('');
      dispatch(clearError());
      errorClearedRef.current = true;

      // Небольшая задержка для уверенности
      setTimeout(() => {
        navigate('/');
      }, 50);
    } else if (user) {
      navigate('/');
    }
  }, [user, displayError, navigate, dispatch]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    console.log('Dispatching loginUser');
    dispatch(loginUser({ email, password }));
  };

  return (
    <LoginUI
      errorText={''} // ← Временно пустая строка
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
};
