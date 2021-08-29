import React, {useState} from 'react';
import Input from "../CommonComponents/Input/Input";
import {InputEnum} from "../../type/types";
import './Login.css'
import {showPopup} from "../CommonComponents/PopupInfo/PopupInfo";

const Login:React.FC = () => {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onClickButtonEnter = () => {
    showPopup('Привет из Логина')
  }

  return (
    <div className='login__container'>
      <div className='login_title'>
        Авторизация
      </div>
      <div className={'login__container_input'}>
        <Input
          value = {email}
          onChange = {setEmail}
          type={InputEnum.text}
          placeholder={'email ...'}
          customClassName='login__input_email'
        />
        <Input
          value = {password}
          onChange = {setPassword}
          type={InputEnum.text}
          placeholder={'password ...'}
          customClassName={'login__input_password'}
        />
      </div>
      <div className={'login__container_buttonEnter'}>
        <button
          className={'login__button_enter'}
          onClick={onClickButtonEnter}
        >
          Войти
        </button>
      </div>
    </div>
  );
};

export default Login;