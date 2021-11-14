import axios from 'axios';
import {Dispatch} from "redux";
import {addFile, deleteFileAction, FileActions, SetFiles} from "../strore/reducerFile";
import {FileType, PopupTypeEnum, SortTypeEnum, UploadFileType, UserType} from "../type/types";
import {addUploadFile, changeUploadFile, setUploaderVisible, UploadActions} from "../strore/reducerUpload";
import {hideLoader, showLoader} from "../strore/reducerApp";
import {AllActions} from "../strore/store";
import {apiUrl} from "../config";
import {showPopup} from "../components/CommonComponents/PopupInfo/PopupInfo";
import {setUser} from "../strore/reducerUser";

export function getFiles(dirId: string | null, sort?: SortTypeEnum) {
  return async (dispatch: Dispatch<AllActions>) => {
    try {
      dispatch(showLoader())
      const baseUrl = `${apiUrl}/api/files`;
      let url = baseUrl;
      if (dirId) {
        url = baseUrl + `?parent=${dirId}`;
      }
      if (sort) {
        url = baseUrl + `?sort=${sort}`;
      }
      if (dirId && dirId) {
        url = baseUrl + `?parent=${dirId}&sort=${sort}`;
      }
      const response = await axios.get(
        url,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      dispatch(SetFiles(response.data))
    } catch (e) {
      console.log(e.response.data.message)
    } finally {
      dispatch(hideLoader())
    }
  }
}

export function createDir(dirId: string | null, name: string) {
  return async (dispatch: Dispatch<FileActions>) => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/files`,
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

    } catch (e) {
      console.log(e.response.data.message)
    }
  }
}

export function uploadFile(file: any, dirId: string | null) {
  return async (dispatch: Dispatch<FileActions | UploadActions>) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      if (dirId) {
        formData.append('parent', dirId);
      }

      const uploadFile: UploadFileType = {name: file.name, progress: 0, id: Date.now() + Math.random() * 1000};
      dispatch(setUploaderVisible(true));
      dispatch(addUploadFile(uploadFile))

      const response = await axios.post(
        `${apiUrl}/api/files/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          onUploadProgress: progressEvent => {
            const totalLength = progressEvent.lengthComputable ? progressEvent.total
              : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
            if (totalLength) {
              uploadFile.progress = Math.round(progressEvent.loaded * 100 / totalLength)
              dispatch(changeUploadFile(uploadFile))
            }
          }
        }
      );
      dispatch(addFile(response.data));

    } catch (e) {
      console.log(e.response.data.message)
    }
  }
}

export async function downloadFile(file: FileType) {
  const response = await fetch(`${apiUrl}/api/files/download?id=${file._id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
  )
  if (response.status === 200) {
    response.blob().then((blob) => {
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
}

export function deleteFile(file: FileType) {
  return async (dispatch: Dispatch<FileActions>) => {
    axios.delete(
      `${apiUrl}/api/files/?id=${file._id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
      .then(() => {
        dispatch(deleteFileAction(file._id));
      })
      .catch((e) => {
        console.log(e.response.data.message)
      })
  }
}

export function searchFiles(searchName: string) {
  return async (dispatch: Dispatch<AllActions>) => {
    try {
      dispatch(showLoader())
      const response = await axios.get(
        `${apiUrl}/api/files/search?search=${searchName}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      dispatch(SetFiles(response.data))
    } catch (e) {
      console.log(e.response.data.message)
    } finally {
      dispatch(hideLoader())
    }
  }
}

export const deleteAvatar = () => {
  return async (dispatch: Dispatch<AllActions>) => {
    try {
      const response = await axios.delete<UserType>(
        `${apiUrl}/api/files/avatar`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      dispatch(setUser(response.data))
    } catch (e) {
      if (e.message === 'Network Error') {
        showPopup(PopupTypeEnum.alarm, e.name + ': ' + e.message)
      } else {
        console.log(e.response)
        showPopup(PopupTypeEnum.alarm, e.response.data.message)
      }
    }
  }
}

export const uploadAvatar = (file: File) => {
  return async (dispatch: Dispatch<AllActions>) => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      const response = await axios.post<UserType>(
        `${apiUrl}/api/files/avatar`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      dispatch(setUser(response.data))
    } catch (e) {
      if (e.message === 'Network Error') {
        showPopup(PopupTypeEnum.alarm, e.name + ': ' + e.message)
      } else {
        console.log(e.response)
        showPopup(PopupTypeEnum.alarm, e.response.data.message)
      }
    }
  }
}