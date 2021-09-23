import React from 'react';
import './Uploader.css'
import {UploadFileType} from "../../type/types";
import UploadFile from "./UploadFile/UploadFile";

const Uploader = () => {

  const files: UploadFileType[] = [{id:1, name: 'file_1', progress: 10}, {id:2, name: 'file_2', progress: 50}, {id:3, name: 'file_3', progress: 100}];

  return (
    <div className="uploader">
      <div className="uploader__header">
        <div className="uploader__title">Загрузки</div>
        <div className="uploader__button-close">&times;</div>
      </div>
      {
        files.map(file=>
          <UploadFile
            key={file.id}
            file={file}
          />)
      }
    </div>
  )
};

export default Uploader;