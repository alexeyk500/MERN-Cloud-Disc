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
  payload: FileType,
}
export const addFile = (file: FileType): AddDirType => {
  return {type: ADD_FILE, payload: file}
}

const PUSH_TO_STACK = 'PUSH_TO_STACK';
type PushToStackType = {
  type: typeof PUSH_TO_STACK,
  payload: string,
}
export const pushToStack = (dirId: string): PushToStackType => {
  return {type: PUSH_TO_STACK, payload: dirId}
}

const POP_FROM_STACK = 'POP_FROM_STACK';
type PopFromStackType = {
  type: typeof POP_FROM_STACK,
}
export const popFromStack = (): PopFromStackType => {
  return {type: POP_FROM_STACK}
}

export type FileActions = SetFilesType | SetCurrentDirType | AddDirType
  | SetPopUpDisplayType | PushToStackType | PopFromStackType

type DefaultStateType = {
  files: Array<FileType>,
  currentDir: string | null,
  popUpShow: string,
  dirsStack: string[],
}
const defaultState: DefaultStateType = {
  files: [],
  currentDir: null,
  popUpShow: 'none',
  dirsStack: [],
}


export default function reducerFile(state=defaultState, action: FileActions):DefaultStateType {
  switch (action.type) {
    case SET_FILES: {
      return {...state, files: action.payload}
    }
    case SET_CURRENT_DIR: {
      return {...state, currentDir: action.payload}
    }
    case ADD_FILE: {
      return {...state, files: [...state.files, action.payload]}
    }
    case SET_POPUP_DISPLAY: {
      return {...state, popUpShow: action.payload}
    }
    case PUSH_TO_STACK: {
      return {...state, dirsStack: [...state.dirsStack, action.payload]}
    }
    case POP_FROM_STACK: {
      if (state.dirsStack.length > 0) {
        const newStack = [...state.dirsStack].slice(0,-1)
        if (newStack.length > 0) {
          return {...state, dirsStack: [...newStack], currentDir: newStack[newStack.length-1]}
        } else {
          return {...state, dirsStack: [], currentDir: null}
        }
      } else {
        return state
      }

    }

    default: return state
  }
}