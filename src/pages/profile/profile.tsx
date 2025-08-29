import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { updateUser } from '../../services/slices/authSlice';
import { TUser } from '@utils-types';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const user: TUser | null = useSelector((state) => state.auth.user);
  const [updateError, setUpdateError] = useState('');

  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  const [initialFormValue, setInitialFormValue] = useState(formValue);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    // Устанавливаем начальные значения при загрузке пользователя
    const newInitialValues = {
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    };

    setInitialFormValue(newInitialValues);
    setFormValue(newInitialValues);
    setShowButtons(false); // Скрываем кнопки при загрузке
  }, [user]);

  // Проверяем изменения относительно начальных значений
  useEffect(() => {
    const isChanged =
      formValue.name !== initialFormValue.name ||
      formValue.email !== initialFormValue.email ||
      formValue.password !== initialFormValue.password;

    setShowButtons(isChanged);
  }, [formValue, initialFormValue]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setUpdateError('');

    try {
      await dispatch(updateUser(formValue)).unwrap();

      // Обновляем начальные значения после успешного сохранения
      setInitialFormValue({
        name: formValue.name,
        email: formValue.email,
        password: '' // Пароль не сохраняем в initial
      });

      setFormValue((prev) => ({ ...prev, password: '' })); // Очищаем пароль
      setShowButtons(false); // Скрываем кнопки после сохранения
    } catch (error: any) {
      setUpdateError(error.message || 'Ошибка обновления данных');
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    // Возвращаем начальные значения
    setFormValue(initialFormValue);
    setUpdateError('');
    setShowButtons(false); // Скрываем кнопки после отмены
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={showButtons}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      updateUserError={updateError}
    />
  );
};
