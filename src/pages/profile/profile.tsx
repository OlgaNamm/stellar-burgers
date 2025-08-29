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
    password: '' // Пароль только для смены пароля (но это отдельный функционал)
  });

  const [initialFormValue, setInitialFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

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
    setShowButtons(false);
  }, [user]);

  // Проверяем изменения только для имени и email
  useEffect(() => {
    const isNameChanged = formValue.name !== initialFormValue.name;
    const isEmailChanged = formValue.email !== initialFormValue.email;

    // Пароль не учитываем в сравнении, так как его нельзя обновить через этот endpoint
    setShowButtons(isNameChanged || isEmailChanged);
  }, [formValue, initialFormValue]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setUpdateError('');

    try {
      // Обновляем только имя и email (пароль через этот endpoint не обновляется)
      const updateData: Partial<TUser> = {};

      if (formValue.name !== initialFormValue.name) {
        updateData.name = formValue.name;
      }

      if (formValue.email !== initialFormValue.email) {
        updateData.email = formValue.email;
      }

      await dispatch(updateUser(updateData)).unwrap();

      // Обновляем начальные значения после успешного сохранения
      setInitialFormValue({
        name: formValue.name,
        email: formValue.email,
        password: '' // Пароль очищаем
      });

      setFormValue((prev) => ({ ...prev, password: '' })); // Очищаем пароль
      setShowButtons(false);
    } catch (error: any) {
      setUpdateError(error.message || 'Ошибка обновления данных');
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    // Возвращаем начальные значения
    setFormValue({
      name: initialFormValue.name,
      email: initialFormValue.email,
      password: '' // Пароль всегда очищаем
    });
    setUpdateError('');
    setShowButtons(false);
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
