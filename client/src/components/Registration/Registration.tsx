import React from 'react';
import Input from "../CommonComponents/Input/Input";
import {InputEnum} from "../../type/types";
import './Registration.css'

const Registration: React.FC = () => {
  return (
    <div className='registration__container'>
      <div className='registration_title'>
        Регистрация
      </div>
      <div className={'registration__container_input'}>
        <Input
          type={InputEnum.text}
          placeholder={'email ...'}
          customClassName='registration__input_email'
        />
        <Input
          type={InputEnum.text}
          placeholder={'password ...'}
          customClassName={'registration__input_password'}
        />
      </div>
      <div className={'registration__container_buttonEnter'}>
        <button
          className={'registration__button_enter'}
        >
          Войти
        </button>
      </div>

      </div>
  );
};

export default Registration;