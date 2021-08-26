import React, {useState} from 'react';
import Input from "../CommonComponents/Input/Input";
import {InputEnum} from "../../type/types";
import './Registration.css'
import {userRegistrationApi} from "../../api/userApi";

const Registration: React.FC = () => {

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const onClickRegistration = () => {
    if (email && password) {
      userRegistrationApi(email, password)
    }
  }

  return (
    <div className='registration__container'>
      <div className='registration_title'>
        Регистрация
      </div>
      <div className={'registration__container_input'}>
        <Input
          value = {email}
          onChange = {setEmail}
          type={InputEnum.text}
          placeholder={'email ...'}
          customClassName='registration__input_email'
        />
        <Input
          value = {password}
          onChange = {setPassword}
          type={InputEnum.text}
          placeholder={'password ...'}
          customClassName={'registration__input_password'}
        />
      </div>
      <div className={'registration__container_buttonEnter'}>
        <button
          className={'registration__button_enter'}
          onClick={onClickRegistration}
        >
          Войти
        </button>
      </div>

      </div>
  );
};

export default Registration;