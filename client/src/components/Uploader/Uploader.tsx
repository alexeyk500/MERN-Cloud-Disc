import React from 'react';
import './Uploader.css'
import UploadFile from "./UploadFile/UploadFile";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../strore/store";
import {setUploaderVisible} from "../../strore/reducerUpload";

const Uploader = () => {

  // const files: UploadFileType[] = [{id:1, name: 'file_1', progress: 10}, {id:2, name: 'file_2', progress: 50}, {id:3, name: 'file_3', progress: 100}];

  const dispatch = useDispatch();
  const isVisible = useSelector((state:StateType)=>state.upload.isVisible)
  const files = useSelector((state:StateType)=>state.upload.files)

  const onClickClose = () =>{
    dispatch(setUploaderVisible(false))
  }

  return (
    isVisible?
      <div className="uploader">
        <div className="uploader__header">
          <div className="uploader__title">Загрузки</div>
          <button
            className="uploader__button-close"
            onClick={onClickClose}
          >
            &times;
          </button>
        </div>
        {
          files.map(file=>
            <UploadFile
              key={file.id}
              file={file}
            />)
        }
      </div>
      : null
  )
};

export default Uploader;