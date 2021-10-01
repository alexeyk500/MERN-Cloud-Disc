import React from 'react';
import './FileList.css'
import {useSelector} from "react-redux";
import {StateType} from "../../../strore/store";
import FileItem from "./FileItem/FileItem";
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import Loader from "../../Loader/Loader";
import {FileListViewEnum} from "../../../type/types";

const FileList: React.FC = () => {

  const files = useSelector((state: StateType) => state.file.files)
  const isLoader = useSelector((state:StateType) => state.app.isLoader);
  const fileListView = useSelector((state:StateType) => state.file.fileListView);


  return (
    <div className="fileList">

      {
        fileListView === FileListViewEnum.list &&
          <div className="fileList__header">
            <div className="fileList__name">
              Name
            </div>
            <div className="fileList__date">
              Date
            </div>
            <div className="fileList__size">
              Size
            </div>
          </div>
      }

      <div className="fileList__scroll-container">
        {
          isLoader? <div className="fileList__loader">
            <Loader/>
          </div>
          : files.length === 0 ?
            <div className="fileList__empty-folder">
              Empty folder ...
            </div>
            :
            fileListView === FileListViewEnum.list?
            <TransitionGroup>
              {
                files.map(file =>
                  <CSSTransition
                    key={file._id}
                    timeout={500}
                    classNames={'file'}
                    exit={false}
                  >
                    <FileItem file={file}/>
                  </CSSTransition>
                )
              }
            </TransitionGroup>

              : <div className="fileList__plates">
                {
                  files.map(file =>
                    <FileItem
                      key={file._id}
                      file={file}
                    />
                  )
                }
              </div>
        }
      </div>
    </div>
  );
}

export default FileList;