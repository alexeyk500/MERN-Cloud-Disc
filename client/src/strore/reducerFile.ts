import {FileType} from "../type/types";


const SET_FILES = 'SET_FILES';
type SetFilesType = {
  type: typeof SET_FILES,
  payload: Array<FileType>
}
export const SetFiles = (files: Array<FileType>): SetFilesType => {
  return {type: SET_FILES, payload: files}
}

const SET_CURRENT_DIR = 'SET_CURRENT_DIR';
type SetCurrentDirType = {
  type: typeof SET_CURRENT_DIR,
  payload: string | null
}
export const SetCurrentDir = (curDir: string | null): SetCurrentDirType => {
  return {type: SET_CURRENT_DIR, payload: curDir}
}


type DefaultStateType = {
  files: Array<FileType>,
  currentDir: string | null,
}
const defaultState: DefaultStateType = {
  files: [],
  currentDir: null,
}

export type FileActions = SetFilesType | SetCurrentDirType

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

    default: return state
  }
}