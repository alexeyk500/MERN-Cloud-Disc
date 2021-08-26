import React from 'react';
import Input from "../CommonComponents/Input/Input";
import {InputEnum} from "../../type/types";
import './Login.css'

const Login = () => {
  return (
    <div className='login__container'>
      <div className='login_title'>
        Авторизация
      </div>
      <div className={'login__container_input'}>
        <Input
          type={InputEnum.text}
          placeholder={'email ...'}
          customClassName='login__input_email'
        />
        <Input
          type={InputEnum.text}
          placeholder={'password ...'}
          customClassName={'login__input_password'}
        />
      </div>
      <div className={'login__container_buttonEnter'}>
        <button
          className={'login__button_enter'}
        >
          Войти
        </button>
      </div>

    </div>
  );
};

export default Login;