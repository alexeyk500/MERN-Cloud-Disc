import React from 'react';
import {FileType, fileTypeEnum} from "../../../../type/types";
import './FileItem.css';
import folderIco from './../../../../assets/img/folderIco.svg'
import fileIco from './../../../../assets/img/fileIco.svg'

type PropsType = {
  file: FileType
}

const FileItem:React.FC <PropsType>= ({file}) => {

  const date = new Date(file.date).toLocaleDateString('en-GB', {
    year : 'numeric',
    month : 'numeric',
    day : 'numeric',
  }).split('/');

  [date[0], date[1], date[2]] = [date[2], date[1], date[0]];

  const dateStr = date.join('-');

  return (
    <div className='fileItem'>
      <img
        src={file.type === fileTypeEnum.dir? folderIco :fileIco}
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
    </div>
  );
};

export default FileItem;