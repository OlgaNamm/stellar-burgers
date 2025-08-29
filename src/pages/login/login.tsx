import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { LoginUI } from '@ui-pages';
import { loginUser, clearError } from '../../services/slices/authSlice';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, user, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log('Current error state:', error);
  }, [error]);

  // Очищаем ошибку при монтировании компонента
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Навигация после успешного входа
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(clearError()); // ← Очищаем перед каждым запросом
    dispatch(loginUser({ email, password }));
  };

  return (
    <LoginUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
