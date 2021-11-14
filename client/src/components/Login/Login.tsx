import React, {useState} from 'react';
import Input from "../CommonComponents/Input/Input";
import {InputTypeEnum} from "../../type/types";
import './Login.css';
import {userLoginApi} from "../../api/userApi";
import {useDispatch} from "react-redux";

const Login: React.FC = () => {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch = useDispatch();

  const onClickButtonEnter = (event: React.MouseEvent) => {
    event.preventDefault()
    dispatch(userLoginApi(email, password));
  }

  return (
    <div className='login__wrapper'>
      <form className='login__container'>
        <div className='login_title'>
          Авторизация
        </div>
        <div className={'login__container_input'}>
          <Input
            value={email}
            onChange={setEmail}
            type={InputTypeEnum.text}
            placeholder={'email ...'}
            customClassName='login__input_email'
          />
          <Input
            value={password}
            onChange={setPassword}
            type={InputTypeEnum.password}
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
      </form>
    </div>

  );
};

export default Login;