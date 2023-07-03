import React from 'react';

import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
  function handleSubmit(evt) {
    evt.preventDefault();

    props.onCardDelete();
  }

  return (
    <PopupWithForm
      name="delete-card"
      title="Вы уверены?"
      buttonTitle="Да"
      isOpen={props.isOpen}
      onClose={props.onClose}
      isValid={true}
      onSubmit={handleSubmit}
    >
    </PopupWithForm>
  )
}

export default EditProfilePopup;

