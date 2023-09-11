import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Register({ onRegister }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleChangeEmail(e) {
    setEmail(e.target.value)
  }

  function handleChangePassword(e) {
    setPassword(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    onRegister(password, email)
  }

  return (
    <div className="register">
      <h2 className="register__title">Регистрация</h2>
      <form
        name="register"
        className="register__form"
        noValidate
        onSubmit={handleSubmit}
      >
        <input
          value={email}
          className="register__input register__input_email"
          type="email"
          placeholder="Email"
          onChange={handleChangeEmail}
        />
        <input
          value={password}
          className="register__input register__input_password"
          type="password"
          placeholder="Password"
          onChange={handleChangePassword}
        />
        <button type="submit" className="register__button">
          Зарегистрироваться
        </button>
      </form>
      <Link to="/sign-in" className="register__button_login">
        Уже зарегистрированы? Войти
      </Link>
    </div>
  )
}
