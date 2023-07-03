import { useEffect, useRef } from 'react'

import PopupWithForm from './PopupWithForm';

import { useFormAndValidation } from '../hooks/UseFormAndValidation';

function EditAvatarPopup(props) {
  const inputRef = useRef()

  const {handleChangeValidation, errors, isValid, resetForm} = useFormAndValidation()

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateAvatar(inputRef.current.value);
  }

  useEffect(() => {
    inputRef.current.value = '';

    resetForm()
  }, [props.isOpen, resetForm])

  return (
    <PopupWithForm
      name="update-avatar"
      title="Обновить аватар"
      buttonTitle={props.isLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        className={`popup__input popup__input_value_link ${errors.link && 'popup__input_type_error'}`}
        required
        ref={inputRef}
        onChange={handleChangeValidation}
      />
      <span
        className={`popup__error popup__error_name_link ${errors.link && 'popup__error_visible'}`}
      >
        {errors.link}
      </span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;

