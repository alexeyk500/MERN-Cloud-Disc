import React from 'react';
import './Navbar.css';
import logo from './../../assets/img/logo.svg';
import {NavLink} from "react-router-dom";

const Navbar:React.FC = () => {
  return (
    <div className='input-container'>
      <div className='navbar'>
        <img src={logo} alt="" className='navbar__logo'/>
        <div className='navbar__header'>
          MERN CLOUD
        </div>
        <div className={'navbar__registration'}>
          <NavLink to={'/registration'}>
            Регистрация
          </NavLink>
        </div>
        <div className='navbar__login'>
          <NavLink to={'/login'}>
            Войти
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Navbar;