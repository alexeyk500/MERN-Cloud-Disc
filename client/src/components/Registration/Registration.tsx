import React, {useState} from 'react';
import Input from "../CommonComponents/Input/Input";
import {InputEnum} from "../../type/types";
import './Registration.css'
import {showPopup} from "../CommonComponents/PopupInfo/PopupInfo";

const Registration: React.FC = () => {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');

  const onClickRegistration = () => {
    showPopup('Пользователь зарегестрирован')
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
        <Input
          value = {repeatPassword}
          onChange = {setRepeatPassword}
          type={InputEnum.text}
          placeholder={'repeat password ...'}
          customClassName={'registration__input_password'}
        />
      </div>
      <div className={'registration__container_buttonEnter'}>
        <div>
          {
            password !== '' || repeatPassword !== ''?
              password === repeatPassword?
                <div className={'registration__title_passwordIsCorrect'}>
                  password is correct
                </div>

                : <div className={'registration__title_passwordsMismatch'}>
                  passwords mismatch
                </div>
              : null
          }
        </div>
        <button
          className={'registration__button_enter'}
          onClick={onClickRegistration}
        >
          Регистрация
        </button>
      </div>
    </div>
  );
};

export default Registration;