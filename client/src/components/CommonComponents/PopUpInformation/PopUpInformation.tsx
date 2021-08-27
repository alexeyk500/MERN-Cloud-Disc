import React from 'react';
import ReactDOM from 'react-dom';
import './PopUpInformation.css'

type PropsType = {
  elementId: string
}

const PopUpInformation:React.FC <PropsType> = ({
  elementId,
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

export const showPopup = () => {
  const div = document.createElement('div');
  div.id = 'message' + new Date().getTime();
  const parent = document.getElementById('root');
  parent!.append(div);
  ReactDOM.render(<PopUpInformation elementId={div.id}/>, div)
}

export default PopUpInformation;