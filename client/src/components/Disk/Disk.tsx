import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../strore/store";
import {getFiles} from "../../api/fileApi";
import './Disk.css'
import FileList from "./FileList/FileList";
import PopUp from "../PopUp/PopUp";
import {popFromStack, setPopUpDisplay} from "../../strore/reducerFile";

const Disk:React.FC = () => {

  const dispatch = useDispatch();
  const currentDir = useSelector((state:StateType) => state.file.currentDir);

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

  return (
    <div className='disk'>
      <div className="disk__title">
        Disk
      </div>
      <div className="disk__buttons">
        <button
          className="disk__button_back"
          onClick={onClickButtonBack}
        >
          Back
        </button>
        <button
          className="disk__button_create"
          onClick={onClickButtonCreate}
        >
          Create Folder
        </button>
      </div>
      <FileList />
      <PopUp />
    </div>
  );
};

export default Disk;