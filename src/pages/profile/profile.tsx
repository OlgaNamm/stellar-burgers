import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { updateUser } from '../../services/slices/authSlice';
import { TUser } from '@utils-types';
import { selectUser } from '../../services/selectors/authSelectors';
import { getErrorMessage } from '../../utils/error-handler';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const user: TUser | null = useSelector(selectUser);
  const [updateError, setUpdateError] = useState('');

  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  const [initialFormValue, setInitialFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const newInitialValues = {
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    };

    setInitialFormValue(newInitialValues);
    setFormValue(newInitialValues);
    setShowButtons(false);
  }, [user]);

  useEffect(() => {
    const isNameChanged = formValue.name !== initialFormValue.name;
    const isEmailChanged = formValue.email !== initialFormValue.email;

    setShowButtons(isNameChanged || isEmailChanged);
  }, [formValue, initialFormValue]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setUpdateError('');

    try {
      const updateData: Partial<TUser> = {};

      if (formValue.name !== initialFormValue.name) {
        updateData.name = formValue.name;
      }

      if (formValue.email !== initialFormValue.email) {
        updateData.email = formValue.email;
      }

      await dispatch(updateUser(updateData)).unwrap();

      setInitialFormValue({
        name: formValue.name,
        email: formValue.email,
        password: ''
      });

      setFormValue((prev) => ({ ...prev, password: '' }));
      setShowButtons(false);
    } catch (error: unknown) {
      setUpdateError(getErrorMessage(error, 'Ошибка обновления данных'));
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: initialFormValue.name,
      email: initialFormValue.email,
      password: ''
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
