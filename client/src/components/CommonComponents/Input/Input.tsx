import React from 'react';
import './Input.css'
import {InputEnum} from "../../../type/types";

type PropsType = {
  type: InputEnum,
  value: string,
  onChange: (newValue: string)=>void,
  placeholder?: string,
  customClassName?: string,
}

const Input:React.FC <PropsType>= ({
  type = InputEnum.text,
  value,
  onChange,
  placeholder,
  customClassName,
}) => {
  const setNewValue = (event: React.ChangeEvent<HTMLInputElement>)=>{
    onChange(event.currentTarget.value)
  }
  return (
    <div className={`input-container ${customClassName}`}>
      <input
        type={type}
        value={value}
        onChange={setNewValue}
        placeholder={placeholder}
        className={'input-input'}
      />
    </div>
  );
};

export default Input;