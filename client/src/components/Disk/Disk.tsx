import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../strore/store";
import {getFiles} from "../../api/fileApi";

const Disk:React.FC = () => {

  const dispatch = useDispatch();
  const currentDir = useSelector((state:StateType) => state.file.currentDir);

  useEffect(()=>{
    dispatch(getFiles(currentDir))
    // eslint-disable-next-line
  },[currentDir])

  return (
    <div>
      Disk
    </div>
  );
};

export default Disk;