import React from 'react';
import {FileListViewEnum, FileType} from "../../../../type/types";
import './FileItem.css';
import folderIco from './../../../../assets/img/folderIco.svg'
import fileIco from './../../../../assets/img/fileIco.svg'
import {useDispatch, useSelector} from "react-redux";
import {pushToStack, setCurrentDir} from "../../../../strore/reducerFile";

import buttonDownloadIco from './../../../../assets/img/buttonDownloadIco.svg';
import buttonDeleteIco from './../../../../assets/img/buttonDeleteIco.svg'
import {deleteFile, downloadFile} from "../../../../api/fileApi";
import sizeFormat from "../../../../utils/sizeFormat";
import {StateType} from "../../../../strore/store";

type PropsType = {
  file: FileType
}

const FileItem: React.FC<PropsType> = ({file}) => {

  const dispatch = useDispatch()
  const fileListView = useSelector((state: StateType) => state.file.fileListView);

  const date = new Date(file.date).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).split('/');

  [date[0], date[2]] = [date[2], date[0]];

  const dateStr = date.join('-');

  function onClickFileItem() {
    if (file.type === 'dir') {
      dispatch(pushToStack(file._id));
      dispatch(setCurrentDir(file._id));
    }
  }

  function onClickDownload(event: React.MouseEvent) {
    event.stopPropagation();
    downloadFile(file)
  }

  function onClickDeleteFile(event: React.MouseEvent) {
    event.stopPropagation();
    if (window.confirm(`${file.name} will be delete ?`)) {
      dispatch(deleteFile(file))
    }
  }

  return (
    fileListView === FileListViewEnum.list ?
      <div
        className='fileItem'
        onClick={onClickFileItem}
      >
        <img
          src={file.type === 'dir' ? folderIco : fileIco}
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
          {sizeFormat(file.size)}
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
          onClick={onClickDeleteFile}
        >
          <img src={buttonDeleteIco} alt=""/>
        </button>
      </div>
      : <div
        className='file-plate-item'
        onClick={onClickFileItem}
      >
        <img
          src={file.type === 'dir' ? folderIco : fileIco}
          className='file-plate-item__img'
          alt=""
        />
        <div className="file-plate-item__name">
          {file.name}
        </div>
        <div className="file-plate-item__date">
          {dateStr}
        </div>
        <div className="file-plate-item__size">
          {sizeFormat(file.size)}
        </div>

        <div className="file-plate-item__buttons">
          {
            file.type !== 'dir' &&
            <button
              className="file-plate-item__btn file-plate-item__btn_download"
              onClick={onClickDownload}
            >
              <img src={buttonDownloadIco} alt=""/>
            </button>
          }
          <button
            className="file-plate-item__btn file-plate-item__btn_delete"
            onClick={onClickDeleteFile}
          >
            <img src={buttonDeleteIco} alt=""/>
          </button>
        </div>

      </div>
  );
};

export default FileItem;