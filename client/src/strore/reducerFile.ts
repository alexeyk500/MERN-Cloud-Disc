import {FileType} from "../type/types";


const SET_FILES = 'SET_FILES';
type SetFilesType = {
  type: typeof SET_FILES,
  payload: Array<FileType>,
}
export const SetFiles = (files: Array<FileType>): SetFilesType => {
  return {type: SET_FILES, payload: files}
}

const SET_CURRENT_DIR = 'SET_CURRENT_DIR';
type SetCurrentDirType = {
  type: typeof SET_CURRENT_DIR,
  payload: string | null
}
export const setCurrentDir = (curDir: string | null): SetCurrentDirType => {
  return {type: SET_CURRENT_DIR, payload: curDir}
}

const SET_POPUP_DISPLAY = 'SET_POPUP_DISPLAY';
type SetPopUpDisplayType = {
  type: typeof SET_POPUP_DISPLAY,
  payload: string
}
export const setPopUpDisplay = (popUpShow: string): SetPopUpDisplayType => {
  console.log('setPopUpDisplay')
  return {type: SET_POPUP_DISPLAY, payload: popUpShow}
}

const ADD_FILE = 'ADD_FILE';
type AddDirType = {
  type: typeof ADD_FILE,
  payload: FileType
}
export const addFile = (file: FileType): AddDirType => {
  return {type: ADD_FILE, payload: file}
}


type DefaultStateType = {
  files: Array<FileType>,
  currentDir: string | null,
  popUpShow: string,
}
const defaultState: DefaultStateType = {
  files: [],
  currentDir: null,
  popUpShow: 'none'
}

export type FileActions = SetFilesType | SetCurrentDirType | AddDirType | SetPopUpDisplayType

export default function reducerFile(state=defaultState, action: FileActions){
  switch (action.type) {
    case SET_FILES: {
      return {
        ...state, files: action.payload
      }
    }
    case SET_CURRENT_DIR: {
      return {...state, currentDir: action.payload}
    }
    case ADD_FILE: {
      return {
        ...state, files: [...state.files, action.payload]
      }
    }
    case SET_POPUP_DISPLAY: {
      console.log('action.payload', action.payload)
      return {...state, popUpShow: action.payload}
    }

    default: return state
  }
}