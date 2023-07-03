import { useState, useContext, useEffect } from 'react'

import PopupWithForm from './PopupWithForm'
import CurrentUserContext from '../contexts/CurrentUserContext';

import { useFormAndValidation } from '../hooks/UseFormAndValidation';

function EditProfilePopup(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const currentUser = useContext(CurrentUserContext);

  const { handleChangeValidation, errors, isValid, resetForm, setIsValid } = useFormAndValidation();

  function handleChangeName(evt) {
    setName(evt.target.value);

    handleChangeValidation(evt);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);

    handleChangeValidation(evt);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  useEffect(() => {
    setName(currentUser?.name);
    setDescription(currentUser?.about);

    resetForm();
    setIsValid(true);
  }, [currentUser, props.isOpen, resetForm, setIsValid]);

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      buttonTitle={props.isLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      isValid={isValid}
    >
      <input
        type="text"
        name="name"
        placeholder="Имя"
        className={`popup__input popup__input_value_name ${errors.name && 'popup__input_type_error'}`}
        minLength="2"
        maxLength="40"
        required
        value={name || ''}
        onChange={handleChangeName}
      />
      <span
        className={`popup__error popup__error_name_name ${errors.name && 'popup__error_visible'}`}
      >
        {errors.name}
      </span>
      <input
        type="text"
        name="job"
        placeholder="О себе"
        className={`popup__input popup__input_value_job ${errors.job && 'popup__input_type_error'}`}
        minLength="2"
        maxLength="200"
        required
        value={description || ''}
        onChange={handleChangeDescription}
      />
      <span
        className={`popup__error popup__error_name_job ${errors.job && 'popup__error_visible'}`}
      >
        {errors.job}
      </span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;

