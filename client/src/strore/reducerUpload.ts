import {UploadFileType} from "../type/types";

const SET_UPLOADER_IS_VISIBLE = 'SET_UPLOADER_IS_VISIBLE';
type SetUploaderIsVisibleType = {
  type: typeof SET_UPLOADER_IS_VISIBLE,
  payload: boolean,
}
export const setUploaderVisible = (isVisible: boolean): SetUploaderIsVisibleType => {
  return {type: SET_UPLOADER_IS_VISIBLE, payload: isVisible}
}

const ADD_UPLOAD_FILE = 'ADD_UPLOAD_FILE';
type AddUploadFileType = {
  type: typeof ADD_UPLOAD_FILE,
  payload: UploadFileType,
}
export const addUploadFile = (file: UploadFileType): AddUploadFileType => {
  return {type: ADD_UPLOAD_FILE, payload: file}
}

const REMOVE_UPLOAD_FILE_BY_ID = 'REMOVE_UPLOAD_FILE_BY_ID';
type RemoveUploadFileByIdType = {
  type: typeof REMOVE_UPLOAD_FILE_BY_ID,
  payload: number,
}
export const removeUploadFileById = (id: number): RemoveUploadFileByIdType => {
  return {type: REMOVE_UPLOAD_FILE_BY_ID, payload: id}
}

const CHANGE_UPLOAD_FILE = 'CHANGE_UPLOAD_FILE';
type ChangeUploadFileType = {
  type: typeof CHANGE_UPLOAD_FILE,
  payload: UploadFileType,
}
export const changeUploadFile = (file: UploadFileType): ChangeUploadFileType => {
  return {type: CHANGE_UPLOAD_FILE, payload: file}
}

type DefaultStateType = {
  files: UploadFileType[],
  isVisible: boolean,
}
const defaultState: DefaultStateType = {
  files: [],
  isVisible: false,
}

export type UploadActions = SetUploaderIsVisibleType | AddUploadFileType
  | RemoveUploadFileByIdType | ChangeUploadFileType;

export default function reducerUpload(state=defaultState, action: UploadActions):DefaultStateType {
  switch (action.type) {

    case SET_UPLOADER_IS_VISIBLE: {
      return {...state, isVisible: action.payload}
    }

    case ADD_UPLOAD_FILE: {
      return {...state, files: [...state.files, action.payload]}
    }

    case REMOVE_UPLOAD_FILE_BY_ID: {
      return {...state, files: state.files.filter(file =>file.id !== action.payload)}
    }

    case CHANGE_UPLOAD_FILE: {
      return {
        ...state,
        files: [...state.files.map(file=>file.id===action.payload.id
        ? {...file, progress: action.payload.progress}
        : {...file}
        )]
      }
    }

    default: return state
  }
}
