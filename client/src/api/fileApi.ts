import axios from 'axios';
import {Dispatch} from "redux";
import {FileActions, SetFiles} from "../strore/reducerFile";

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