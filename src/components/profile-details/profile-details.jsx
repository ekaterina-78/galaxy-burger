import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AdmissionForm } from '../admission-form/admission-form';
import { useFormInputs } from '../../hooks/useFormInputs';
import { FORM_INPUTS } from '../../utils/const-variables/form-variables';
import { useSelector } from 'react-redux';
import { selectUserPersonalInfo } from '../../services/selectors/user-profile';
import { clearGetUserErrorMessage } from '../../services/slices/user-admission';
import { Loader } from '../loader/loader';
import {
  selectGetUserState,
  selectUpdateUserState,
} from '../../services/selectors/user-admission';
import { clearUserUpdateErrorMessage } from '../../services/slices/user-admission';
import { onUserInfoUpdate } from '../../services/thunks/user-admission';
import { onGetUserInfo } from '../../services/thunks/user-admission';

export const ProfileDetails = () => {
  const dispatch = useDispatch();

  const { name, email } = useSelector(selectUserPersonalInfo);
  const { isLoading, errorMessage: errorMessageGetInfo } =
    useSelector(selectGetUserState);
  const { isLoading: isLoadingUpdate, errorMessage: errorMessageUpdateInfo } =
    useSelector(selectUpdateUserState);

  useEffect(() => {
    if (!name || !email) {
      dispatch(onGetUserInfo());
    }
  }, [dispatch, name, email]);

  const profileForm = useFormInputs({ name, email, password: '' });

  const getFormInputs = () => {
    const nameInput = {
      ...FORM_INPUTS.name,
      value: profileForm.form.name,
      icon: 'EditIcon',
    };
    const emailInput = {
      ...FORM_INPUTS.email,
      value: profileForm.form.email,
      icon: 'EditIcon',
    };
    const passwordInput = {
      ...FORM_INPUTS.password,
      value: profileForm.form.password,
      icon: 'EditIcon',
    };
    return [nameInput, emailInput, passwordInput];
  };

  const handleCancelEdit = e => {
    e.preventDefault();
    profileForm.setForm({ name, email, password: '' });
  };

  const handleUpdatePersonInfo = e => {
    e.preventDefault();
    dispatch(onUserInfoUpdate(profileForm.form));
    profileForm.setForm({ name, email, password: '' });
  };

  const getFormButtons = () => {
    const isFormEdited =
      profileForm.form.name !== name ||
      profileForm.form.email !== email ||
      profileForm.form.password !== '';
    return isFormEdited
      ? [
          {
            title: 'Отмена',
            type: 'secondary',
            htmlType: 'reset',
          },
          {
            title: 'Сохранить',
            type: 'primary',
            htmlType: 'submit',
          },
        ]
      : null;
  };

  const getFormEvents = () => {
    return {
      onFormChange: profileForm.handleFormChange,
      onFormSubmit: handleUpdatePersonInfo,
      onFormReset: handleCancelEdit,
    };
  };

  const getErrors = () => {
    const handleCloseModalGetInfo = () => dispatch(clearGetUserErrorMessage());
    const handleCloseModalUpdateInfo = () =>
      dispatch(clearUserUpdateErrorMessage());
    return [
      {
        errorMessage: errorMessageGetInfo,
        handleCloseModal: handleCloseModalGetInfo,
      },
      {
        errorMessage: errorMessageUpdateInfo,
        handleCloseModal: handleCloseModalUpdateInfo,
      },
    ];
  };

  return isLoading || isLoadingUpdate ? (
    <Loader />
  ) : (
    <AdmissionForm
      inputs={getFormInputs()}
      buttons={getFormButtons()}
      formEvents={getFormEvents()}
      errors={getErrors()}
    />
  );
};
