import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import logoMesto from '../images/logo-mesto.svg';

function Header(props) {
  const mobileWindowWidth = 480;
  const headerMenu = useRef();
  const hamburger = useRef();


  function handleHamburgerClick() {
    headerMenu.current.classList.toggle('header_menu_show');
    hamburger.current.classList.toggle('header__hamburger_active');
  }

  function hideHeaderMenu() {
    if (window.innerWidth > mobileWindowWidth) {
      headerMenu.current.classList.remove('header_menu_show');
      hamburger.current.classList.remove('header__hamburger_active');
    }
  }

  useEffect(() => {
    if (props.isLoggedIn) {
      window.addEventListener('resize', hideHeaderMenu);
    }

    return (() => {
      window.removeEventListener('resize', hideHeaderMenu);
    })
  }, [props]);

  return (
    <header className="header">
      {props.isLoggedIn
        ? <>
          <div className="header__container">
            <img
              src={logoMesto}
              alt="Лого Место"
              className="header__logo"
            />
            <button
              type="button"
              className="header__hamburger"
              ref={hamburger}
              onClick={handleHamburgerClick}
            ></button>
          </div>
          <ul
            className="header__menu"
            ref={headerMenu}
          >
            <li>
              <p className="header__email">{props.email}</p>
            </li>
            <li>
              <p className="header__exit" onClick={props.signOut}>Выйти</p>
            </li>
          </ul>
        </>
        : <>
          <div className="header__container">
            <img
              src={logoMesto}
              alt="Лого Место"
              className="header__logo"
            />
            <Link
              to={props.link}
              className="header__link link"
            >
              {props.linkTitle}
            </Link>
          </div>
        </>
      }
    </header>
  );
}

export default Header;
