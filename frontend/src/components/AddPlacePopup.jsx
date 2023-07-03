import { useEffect, useState } from 'react'

import PopupWithForm from './PopupWithForm';

import { useFormAndValidation } from '../hooks/UseFormAndValidation';

function AddPlacePopup(props) {
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');

  const {handleChangeValidation, errors, isValid, resetForm} = useFormAndValidation()

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);

    handleChangeValidation(evt)
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);

    handleChangeValidation(evt)
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdatePlace({
      name: description,
      link
    });
  }

  useEffect(() => {
    setDescription('')
    setLink('')

    resetForm()
  }, [props.isOpen, resetForm])

  return (
    <PopupWithForm
      name="add-image"
      title="Новое место"
      buttonTitle={props.isLoading ? 'Сохранение...' : 'Создать'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        type="text"
        name="description"
        placeholder="Название"
        className={`popup__input popup__input_value_description ${errors.description && 'popup__input_type_error'}`}
        minLength="2"
        maxLength="30"
        required
        value={description || ''}
        onChange={handleChangeDescription}
      />
      <span
        className={`popup__error popup__error_name_description ${errors.description && 'popup__error_visible'}`}
      >
        {errors.description}
      </span>
      <input
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        className={`popup__input popup__input_value_link ${errors.link && 'popup__input_type_error'}`}
        required
        value={link || ''}
        onChange={handleChangeLink}
      />
      <span
        className={`popup__error popup__error_name_link ${errors.link && 'popup__error_visible'}`}
      >
        {errors.link}
      </span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;

