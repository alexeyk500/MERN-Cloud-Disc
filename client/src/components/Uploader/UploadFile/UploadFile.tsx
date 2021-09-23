import React from 'react';
import './UploadFile.css';
import {UploadFileType} from "../../../type/types";
import {useDispatch} from "react-redux";
import {removeUploadFileById} from "../../../strore/reducerUpload";

type PropsType = {
  file: UploadFileType
}

const UploadFile: React.FC <PropsType> = ({file}) => {

  const dispatch = useDispatch();

  const onClickClose = () => {
    dispatch(removeUploadFileById(file.id))
  }

  return (
    <div className='upload-file'>
      <div className="upload-file__header">
        <div className="upload-file__file-name">
          {file.name}
        </div>
        <button
          className="upload-file__button-remove"
          onClick={onClickClose}
        >
          &times;
        </button>
      </div>
      <div className="upload-file__progress-bar">
        <div className="upload-file__upload-bar" style={{width: file.progress + '%'}}/>
        <div className="upload-file__percent">
          {file.progress} %
        </div>
      </div>
    </div>
  );
};

export default UploadFile;