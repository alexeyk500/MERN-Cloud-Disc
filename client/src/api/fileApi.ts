import axios from 'axios';
import {Dispatch} from "redux";
import {addFile, FileActions, SetFiles} from "../strore/reducerFile";
import {FileTypeEnum} from "../type/types";

export function getFiles(dirId: string | null) {
  return async (dispatch: Dispatch<FileActions>) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/files${dirId? '?parent'+ dirId :''}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      console.log('file response =', response.data)
      dispatch(SetFiles(response.data))
    } catch (e) {
      console.log(e.response.data.message)
    }
  }
}

export function createDir(dirId: string | null, name: string) {
  return async (dispatch: Dispatch<FileActions>) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/files`,
        {
          name,
          type: FileTypeEnum.dir,
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
}