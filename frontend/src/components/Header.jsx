import logo from '../images/header_logo.svg'
import { Link, useLocation } from 'react-router-dom'

export function Header({ loggedIn, email, onSignOut }) {
  const { pathname } = useLocation()

  const textBar = pathname === `${'/sign-in'}` ? 'Регистрация' : 'Войти'
  const linkRoute = `${pathname === '/sign-in' ? '/sign-up' : '/sign-in'}`

  return (
    <header className="header">
      <img src={logo} alt="Место Россия" className="header__logo" />
      <nav className="header__navbar navbar__container">
        {loggedIn ? (
          <>
            <h2 className="navbar__link">{email}</h2>
            <Link to="" onClick={onSignOut} className="navbar__link_out">
              Выйти
            </Link>
          </>
        ) : (
          <>
            <Link to={linkRoute} className="navbar__link_out">
              {textBar}
            </Link>
          </>
        )}
      </nav>
    </header>
  )
}
