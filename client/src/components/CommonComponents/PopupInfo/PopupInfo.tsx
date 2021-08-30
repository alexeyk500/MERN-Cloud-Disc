import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './PopupInfo.css'
import {PopupTypeEnum} from "../../../type/types";

type PropsType = {
  messageText?: string,
  elementId: string,
  popupType?: PopupTypeEnum,
}

const PopupInfo:React.FC <PropsType> = ({
  elementId,
  messageText,
  popupType = PopupTypeEnum.info,
}) => {
  const [classesForContainer, setClassesForContainer] = useState(['popup__container']);
  const [classesForMessageBox, setClassesForMessageBox] = useState(['popup__messagebox']);

  useEffect(()=>{
    setClassesForContainer([...classesForContainer, 'onShowContainer']);
    setClassesForMessageBox([...classesForMessageBox, 'onShowMessageBox']);
    // eslint-disable-next-line
  },[])

  const popup = document.getElementById(elementId);
  const onClickHidePopup = () => {
    if (popup) {
      setClassesForContainer([...classesForContainer, 'onCloseContainer'])
      setClassesForMessageBox([...classesForMessageBox, 'onCloseMessageBox'])
      setTimeout(()=>{
        ReactDOM.unmountComponentAtNode(popup);
        popup.parentNode?.removeChild(popup);
      },500)
    }
  }

  return (
    <div className={classesForContainer.join(' ')}>
      <div className={classesForMessageBox.join(' ')}>
        <div className={'popup__messageText'}>
          {messageText}
        </div>
        <button
          className={ popupType === PopupTypeEnum.info?
            'popup__button_ok'
            :'popup__button_alarm'
          }
          onClick={onClickHidePopup}
        >
          Понятно
        </button>
      </div>
    </div>
  );
};

export const showPopup = (popupType: PopupTypeEnum, messageText: string) => {
  const popup = document.createElement('div');
  popup.id = 'message' + new Date().getTime();
  const parent = document.getElementById('root');

  if (parent) {
    parent.append(popup);
  }

  ReactDOM.render(
    <PopupInfo
      elementId={popup.id}
      popupType={popupType}
      messageText={messageText}
    />, popup
  )
}

