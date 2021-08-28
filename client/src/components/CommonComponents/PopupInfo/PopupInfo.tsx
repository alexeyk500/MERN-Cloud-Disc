import React from 'react';
import ReactDOM from 'react-dom';
import './PopupInfo.css'

type PropsType = {
  messageText?: string
  elementId: string
}

const PopupInfo:React.FC <PropsType> = ({
  elementId,
  messageText,
}) => {
  const div = document.getElementById(elementId);
  const onClickHidePopup = () => {
    if (div) {
      ReactDOM.unmountComponentAtNode(div);
      div.parentNode?.removeChild(div);
    }
  }

  return (
    <div className={'popup__container'}>
      <div className={'popup__messagebox'}>
        <div className={'popup__messageText'}>
          {messageText}
        </div>
          Я PopUp
        <button
          className={'popup__button_ok'}
          onClick={onClickHidePopup}
        >
          Понятно
        </button>
      </div>
    </div>
  );
};

export const showPopup = (messageText: string) => {
  const div = document.createElement('div');
  div.id = 'message' + new Date().getTime();
  const parent = document.getElementById('root');
  parent!.append(div);
  ReactDOM.render(
    <PopupInfo
      elementId={div.id}
      messageText={messageText}
    />, div
  )
}

export default PopupInfo;