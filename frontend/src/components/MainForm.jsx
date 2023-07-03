import React from 'react';
import { Link } from 'react-router-dom';

function MainForm(props) {
  return (
    <section className="main-form">
      <h1 className="main-form__title">
        {props.title}
      </h1>
      <form
        action="#"
        name={props.name}
        className="main-form__form"
        onSubmit={props.onSubmit}
      >
        {props.children}
        <button
          type="submit"
          className={`main-form__save-button ${!props.isValid && 'main-form__save-button_disabled'}`}
          disabled={!props.isValid && true}
        >
          {props.buttonTitle || 'Сохранить'}
        </button>
        {props.isRegister &&
          <p className="main-form__description">
            Уже зарегистрированы? <Link to='/sign-in' className="link">Войти</Link>
          </p>
        }
      </form>
    </section>
  )
}

export default MainForm;
