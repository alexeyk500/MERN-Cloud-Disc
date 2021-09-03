import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../strore/store";
import {getFiles} from "../../api/fileApi";
import './Disk.css'
import FileList from "./FileList/FileList";

const Disk:React.FC = () => {

  const dispatch = useDispatch();
  const currentDir = useSelector((state:StateType) => state.file.currentDir);

  useEffect(()=>{
    dispatch(getFiles(currentDir))
    // eslint-disable-next-line
  },[currentDir])

  return (
    <div className='disk'>
      Disk
      <div className="disk__buttons">
        <button className="disk__button_back">
          Back
        </button>
        <button className="disk__button_create">
          Create Folder
        </button>
      </div>
      <FileList />
    </div>
  );
};

export default Disk;