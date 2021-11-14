import React from 'react';
import './Navbar.css';
import logo from './../../assets/img/logo.svg';
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../strore/store";
import {logoutUser} from "../../strore/reducerUser";

import avatarLogo from './../../assets/img/avatarLogo.svg'
import {apiUrl} from "../../config";

const Navbar:React.FC = () => {

  const dispatch = useDispatch();
  const isAuth = useSelector<StateType>(state => state.user.isAuth)
  const user: any = useSelector<StateType>(state => state.user.currentUser)


  const onClickLogout = () => {
    dispatch(logoutUser())
  }

  return (
      <div className='navbar'>
        <img src={logo} alt="" className='navbar__logo'/>
        <div className='navbar__header'>
          MERN CLOUD
        </div>
          {
            !isAuth &&
            <div className={'navbar__registration'}>
              <NavLink to={'/registration'} style={{ textDecoration: 'none' }}>
                Регистрация
              </NavLink>
            </div>
          }
        {
          !isAuth &&
          <div className='navbar__login'>
            <NavLink to={'/login'} style={{ textDecoration: 'none' }}>
              Войти
            </NavLink>
          </div>
        }
        {
          isAuth &&
          <div
            className='navbar__logout'
            onClick={onClickLogout}
          >
              Выйти
          </div>
        }
        {
          isAuth &&
            <NavLink
              to={'/profile'}
              className={'navbar__container-ico'}
            >
              <img
                src={user.avatar ? `${apiUrl}/${user.avatar}` : avatarLogo}
                className={'navbar__ico'}
                alt=""
              />
            </NavLink>
        }

      </div>
  );
}

export default Navbar;