import axios from 'axios';
import {Dispatch} from "redux";
import {addFile, FileActions, SetFiles} from "../strore/reducerFile";
import {FileType} from "../type/types";

export function getFiles(dirId: string | null) {
  return async (dispatch: Dispatch<FileActions>) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/files${dirId? '?parent='+ dirId :''}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      dispatch(SetFiles(response.data))
    } catch (e) {
      console.log(e.response.data.message)
    }
  }
};

export function createDir(dirId: string | null, name: string) {
  return async (dispatch: Dispatch<FileActions>) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/files`,
        {
          name,
          // type: FileTypeEnum.dir,
          type: 'dir',
          parent: dirId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      dispatch(addFile(response.data));
      console.log('createDir response =', response.data)

    } catch (e) {
      console.log(e.response.data.message)
    }
  }
};

export function uploadFile(file: any, dirId: string | null) {
  return async (dispatch: Dispatch<FileActions>) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      if (dirId) {
        formData.append('parent', dirId);
      }
      const response = await axios.post(
        `http://localhost:5000/api/files/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          onUploadProgress: progressEvent=>{
            const totalLength = progressEvent.lengthComputable ? progressEvent.total
              : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
            console.log('totalLength =', totalLength)
            if (totalLength) {
              const progress = Math.round(progressEvent.loaded*100/totalLength)
              console.log('progress =', progress)
            }
          }
        }
      );
      dispatch(addFile(response.data));
      console.log('file upload =', response.data)

    } catch (e) {
      console.log(e.response.data.message)
    }
  }
};

export async function downloadFile (file: FileType) {
  const response = await fetch(`http://localhost:5000/api/files/download?id=${file._id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
  )
  if (response.status === 200) {
    response.blob().then((blob)=>{
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = file.name
      document.body.appendChild(link)
      link.click()
      link.remove()
    })
  } else {
    console.log('save file error')
  }

};