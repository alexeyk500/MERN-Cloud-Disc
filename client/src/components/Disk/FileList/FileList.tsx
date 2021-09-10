import React from 'react';
import './FileList.css'
import {useSelector} from "react-redux";
import {StateType} from "../../../strore/store";
import FileItem from "./FileItem/FileItem";

const FileList: React.FC = () => {

  const files = useSelector((state: StateType) => state.file.files).map(
    file =>
      <FileItem
        key={file._id}
        file={file}
      />
  )

  // const file_1: FileType = {
  //   id: 'id_string',
  //   accessLink: "accessLink",
  //   childs: [{ref: 'ytrytr', type: fileTypeEnum.dir}],
  //   date: new Date(),
  //   name: "name_123456",
  //   parent: "",
  //   path: "path cudato",
  //   size: 0,
  //   type: fileTypeEnum.dir,
  //   ref: 'ref_iuyiuyiy',
  //   user: "user_qwewqeqweqwe334234"
  // }
  //
  // const file_2: FileType = {
  //   id: 'id_stweqwring',
  //   accessLink: "aeqeessLink",
  //   childs: [{ref: 'ytryweqwetr', type: fileTypeEnum.file}],
  //   date: new Date(),
  //   name: "namweqe_123456",
  //   parent: "",
  //   path: "paqweqwth cudato",
  //   size: 450,
  //   type: fileTypeEnum.file,
  //   ref: 'weqwref_iuyiuyiy',
  //   user: "ewqweuser_qwewqeqweqwe334234"
  // }
  //
  // const files = [file_1, file_2, file_1, file_2 ,file_1 ].map((file, ind)=>{
  //   return(
  //     <FileItem
  //       file={file}
  //       key={ind}
  //     />)
  // })

  // const files = [file_1,file_1 ,file_1 ]
  // console.log('files', files)

  return (
    <div className="fileList">
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
      {files}
    </div>
  );
}

export default FileList;