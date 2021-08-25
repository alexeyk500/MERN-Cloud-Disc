import React from 'react';
import './Navbar.css';
import logo from './../../assets/img/logo.svg'

const Navbar:React.FC = () => {
  return (
    <div className='container'>
      <div className='navbar'>
        <img src={logo} alt="" className='navbar__logo'/>
        <div className='navbar__header'>
          MERN CLOUD
        </div>
        <div className='navbar__login'>
          Войти
        </div>
        <div className='navbar__registration'>
          Регистрация
        </div>
      </div>
    </div>
  );
};

export default Navbar;