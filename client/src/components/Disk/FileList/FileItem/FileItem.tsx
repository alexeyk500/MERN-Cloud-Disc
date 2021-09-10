import React from 'react';
import {FileType} from "../../../../type/types";
import './FileItem.css';
import folderIco from './../../../../assets/img/folderIco.svg'
import fileIco from './../../../../assets/img/fileIco.svg'
import {useDispatch} from "react-redux";
import {pushToStack, setCurrentDir} from "../../../../strore/reducerFile";

import buttonDownloadIco from './../../../../assets/img/buttonDownloadIco.svg';
import buttonDeleteIco from './../../../../assets/img/buttonDeleteIco.svg'
import {downloadFile} from "../../../../api/fileApi";

type PropsType = {
  file: FileType
}

const FileItem:React.FC <PropsType>= ({file}) => {

  const dispatch = useDispatch()

  const date = new Date(file.date).toLocaleDateString('en-GB', {
    year : 'numeric',
    month : 'numeric',
    day : 'numeric',
  }).split('/');

  [date[0], date[2]] = [date[2], date[0]];

  const dateStr = date.join('-');

  function onClickFileItem() {
    dispatch(pushToStack(file._id));
    dispatch(setCurrentDir(file._id));
  }

  function onClickDownload(event: React.MouseEvent) {
    event.stopPropagation()
    downloadFile(file)
  }

  return (
    <div
      className='fileItem'
      onClick={onClickFileItem}
    >
      <img
        src={file.type === 'dir'? folderIco :fileIco}
        className='fileItem__img'
        alt=""
      />
      <div className="fileItem__name">
        {file.name}
      </div>
      <div className="fileItem__date">
        {dateStr}
      </div>
      <div className="fileItem__size">
        {file.size}
      </div>
      {
        file.type !== 'dir' &&
        <button
          className="fileItem__btn fileItem__btn_download"
          onClick={onClickDownload}
        >
          <img src={buttonDownloadIco} alt=""/>
        </button>
      }
      <button
        className="fileItem__btn fileItem__btn_delete"
      >
        <img src={buttonDeleteIco} alt=""/>
      </button>
    </div>
  );
};

export default FileItem;