import React from 'react';
import UseClosePopupOnKeydown from '../hooks/UseClosePopupOnKeydown';

function InfoTooltip(props) {
  return (
    <div
      className={`popup popup_name_info-tooltip ${props.isOpen && 'popup_opened'}`}
      onClick={(evt) => evt.target.classList.contains('popup') && props.onClose()}
    >
      <div className="popup__container">
        <div className={`popup__icon ${props.isError && 'popup__icon_type_unsuccessfull'}`}></div>
        <h3 className="popup__title popup__title_position_center">
          {props.tooltip}
        </h3>
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

export default InfoTooltip;
