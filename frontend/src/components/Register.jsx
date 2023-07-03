import { useState } from 'react';

import MainForm from './MainForm';

import { useFormAndValidation } from '../hooks/UseFormAndValidation';

function Register(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { handleChangeValidation, errors, isValid, resetForm } = useFormAndValidation();

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);

    handleChangeValidation(evt);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);

    handleChangeValidation(evt);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onRegister(password, email);

    setEmail('');
    setPassword('');
    resetForm();
  }

  return (
    <main>
      <MainForm
        name="register"
        title="Регистрация"
        buttonTitle={props.isLoading ? 'Сохранение...' : 'Зарегистрироваться'}
        onSubmit={handleSubmit}
        isRegister
        isValid={isValid}
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          className={`main-form__input main-form__input_value_email ${errors.email && 'main-form__input_type_error'}`}
          required
          value={email}
          onChange={handleChangeEmail}
        />
        <span
          className={`main-form__error main-form__error_name_email ${errors.email && 'main-form__error_visible'}`}
        >
          {errors.email}
        </span>
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          className={`main-form__input main-form__input_value_password ${errors.password && 'main-form__input_type_error'}`}
          minLength="8"
          required
          value={password}
          onChange={handleChangePassword}
        />
        <span
          className={`main-form__error main-form__error_name_password ${errors.password && 'main-form__error_visible'}`}
        >
          {errors.password}
        </span>
      </MainForm>
    </main>
  )
}

export default Register;
