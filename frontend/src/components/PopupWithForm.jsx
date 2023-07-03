import React from 'react';
import UseClosePopupOnKeydown from '../hooks/UseClosePopupOnKeydown';

function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_name_${props.name} ${props.isOpen && 'popup_opened'}`}
      onClick={(evt) => evt.target.classList.contains('popup') && props.onClose()}
    >
      <div className="popup__container">
        <h3 className="popup__title">
          {props.title}
        </h3>
        <form
          action="#"
          name={props.name}
          className="popup__form"
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button
            type="submit"
            className={`popup__save-button ${!props.isValid && 'popup__save-button_disabled'}`}
            disabled={!props.isValid && true}
          >
            {props.buttonTitle || 'Сохранить'}
          </button>
        </form>
        <button
          type="button"
          className="popup__close-button"
          onClick={props.onClose}
        ></button>
      </div>
      {props.isOpen && <UseClosePopupOnKeydown action={props.onClose} />}
    </div>
  );
}

export default PopupWithForm;
