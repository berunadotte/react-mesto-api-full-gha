import React from 'react'

export default function Login({ onLogin }) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  function handleChangeEmail(e) {
    setEmail(e.target.value)
  }

  function handleChangePassword(e) {
    setPassword(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    onLogin(password, email)
  }

  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
      <form
        name="register"
        className="register__form"
        noValidate
        onSubmit={handleSubmit}
      >
        <input
          value={email}
          className="login__form login__form_email"
          type="email"
          placeholder="Email"
          onChange={handleChangeEmail}
        />
        <input
          value={password}
          className="login__form login__form_password"
          type="password"
          placeholder="Password"
          onChange={handleChangePassword}
        />
        <button type="submit" className="login__button">
          Войти
        </button>
      </form>
    </div>
  )
}
