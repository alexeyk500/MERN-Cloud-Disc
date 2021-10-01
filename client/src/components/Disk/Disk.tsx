import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../strore/store";
import {getFiles, uploadFile} from "../../api/fileApi";
import './Disk.css'
import FileList from "./FileList/FileList";
import PopUp from "../PopUp/PopUp";
import {popFromStack, setPopUpDisplay} from "../../strore/reducerFile";
import Uploader from "../Uploader/Uploader";
import {SortTypeEnum} from "../../type/types";
import Loader from "../Loader/Loader";

const Disk:React.FC = () => {

  const dispatch = useDispatch();
  const currentDir = useSelector((state:StateType) => state.file.currentDir);
  const isLoader = useSelector((state:StateType) => state.app.isLoader);

  const [dragEnter, setDragEnter] = useState<boolean>(false)
  const [sort, setSort] = useState<SortTypeEnum>(SortTypeEnum.name)

  useEffect(()=>{
    dispatch(getFiles(currentDir, sort))
    // eslint-disable-next-line
  },[currentDir, sort])

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

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value as SortTypeEnum)
  }

  if (isLoader) {
    return(
      <div className="disk__loader">
        <Loader/>
      </div>
    )
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
          <select
            className="disk__select"
            defaultValue={sort}
            onChange={onChangeSelect}
          >
            <option value={SortTypeEnum.name}>Sort by Name</option>
            <option value={SortTypeEnum.date}>Sort by Date</option>
            <option value={SortTypeEnum.size}>Sort by Size</option>
            <option value={SortTypeEnum.type}>Sort by Type</option>
          </select>
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
        <Uploader />
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