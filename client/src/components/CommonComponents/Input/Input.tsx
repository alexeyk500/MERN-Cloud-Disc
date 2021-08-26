import React from 'react';
import './Input.css'
import {InputEnum} from "../../../type/types";

type PropsType = {
  type: InputEnum,
  placeholder?: string,
  customClassName?: string,
}

const Input:React.FC <PropsType>= ({
  type = InputEnum.text,
  placeholder,
  customClassName,
}) => {
  return (
    <div className={`input-container ${customClassName}`}>
      <input
        type={type}
        placeholder={placeholder}
        className={'input-input'}
      />
    </div>
  );
};

export default Input;