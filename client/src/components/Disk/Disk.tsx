import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../strore/store";
import {getFiles, uploadFile} from "../../api/fileApi";
import './Disk.css'
import FileList from "./FileList/FileList";
import PopUp from "../PopUp/PopUp";
import {popFromStack, setPopUpDisplay} from "../../strore/reducerFile";

const Disk:React.FC = () => {

  const dispatch = useDispatch();
  const currentDir = useSelector((state:StateType) => state.file.currentDir);

  const [dragEnter, setDragEnter] = useState<boolean>(false)

  useEffect(()=>{
    dispatch(getFiles(currentDir))
    // eslint-disable-next-line
  },[currentDir])

  function onClickButtonCreate() {
    dispatch(setPopUpDisplay('flex'))
  }

  function onClickButtonBack() {
      dispatch(popFromStack());
  }

  function onChangeInputFile(event: React.ChangeEvent<any>) {
    const files = [...event.target.files]
    files.forEach(file=>{
      dispatch(uploadFile(file, currentDir))
    })
  }

  function onDragEnter(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    setDragEnter(true);
  }

  function onDragLeave(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    setDragEnter(false);
  }

  function onDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    const files = Array.from(event.dataTransfer.files)
    files.forEach(file=>{
      dispatch(uploadFile(file, currentDir))
    })
    setDragEnter(false);
  }

  return (
    !dragEnter?
      <div
        className='disk'
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragEnter}
      >
        <div className="disk__title">
          Disk
        </div>
        <button
          className="disk__button_back"
          onClick={onClickButtonBack}
        >
          Back
        </button>
        <div className="disk__buttons">
          <button
            className="disk__button_create"
            onClick={onClickButtonCreate}
          >
            Create Folder
          </button>
          <div className="disk__upload">
            <label htmlFor="disk__upload_input" className="disk__upload_label">Load File</label>
            <input
              type="file"
              id="disk__upload_input"
              className="disk__upload_input"
              multiple={true}
              onChange={onChangeInputFile}
            />
          </div>
        </div>
        <FileList />
        <PopUp />
      </div>
      :<div
        className="drag_area"
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragEnter}
        onDrop={onDrop}
      >
        Drag yours files here ...
      </div>
  );
};

export default Disk;