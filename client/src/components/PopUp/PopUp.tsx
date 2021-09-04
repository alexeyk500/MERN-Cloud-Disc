import React, {useState} from 'react';
import './PopUp.css'
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../strore/store";
import {setPopUpDisplay} from "../../strore/reducerFile";
import {createDir} from "../../api/fileApi";

const PopUp:React.FC = () => {

  const dispatch = useDispatch();
  const [dirName, setDirName] = useState<string>('')
  const popUpShow = useSelector((state:StateType) => state.file.popUpShow);
  const currentDir = useSelector((state:StateType) => state.file.currentDir);

  function onClickClose() {
    dispatch(setPopUpDisplay('none'))
  }

  function onClickCreate() {
    if (dirName) {
      dispatch(createDir(currentDir, dirName));
      setDirName('');
      dispatch(setPopUpDisplay('none'));
    }
  }

  function onClickPopUp() {
    dispatch(setPopUpDisplay('none'))
  }

  function onClickContent(e: React.MouseEvent) {
    e.stopPropagation()
  }

  return (
    <div
      className='popup'
      style={{display: popUpShow}}
      onClick={onClickPopUp}
    >
      <div className="popup__content"
        onClick={onClickContent}
      >
        <div className="popup__header">
          <div className="popup__title">
            Create New Folder
          </div>
          <button
            className="popup__close"
            onClick={onClickClose}
          >
            x
          </button>
        </div>
        <input
          type="text"
          className="popup__input"
          value={dirName}
          onChange={(e)=>{setDirName(e.target.value)}}
          placeholder={'Type Folder name ...'}
        />
        <button
          className="popup__create"
          onClick={onClickCreate}
        >
          Create Folder
        </button>
      </div>

    </div>
  );
};

export default PopUp;