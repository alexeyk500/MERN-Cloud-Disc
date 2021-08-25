import React from 'react';
import classes from './Input.module.css';
import {InputEnum} from "../../../type/types";


type PropsType = {
  type: InputEnum,
  placeholder: string,
}

const Input:React.FC <PropsType>= ({
    type,
    placeholder,
  }) => {
  return (
    <div className={classes.container}>
      Input
    </div>
  );
};

export default Input;