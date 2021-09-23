import {UploadFileType} from "../type/types";

const SET_UPLOADER_IS_VISIBLE = 'SET_UPLOADER_IS_VISIBLE';
type SetUploaderIsVisibleType = {
  type: typeof SET_UPLOADER_IS_VISIBLE,
  payload: boolean,
}
export const setUploaderVisible = (isVisible: boolean): SetUploaderIsVisibleType => {
  return {type: SET_UPLOADER_IS_VISIBLE, payload: isVisible}
}

type DefaultStateType = {
  files: UploadFileType[],
  isVisible: boolean,
}
const defaultState: DefaultStateType = {
  files: [],
  isVisible: false,
}

export type UploadActions = SetUploaderIsVisibleType

export default function reducerUpload(state=defaultState, action: UploadActions):DefaultStateType {
  switch (action.type) {
    case SET_UPLOADER_IS_VISIBLE : {
      return state
    }
    default: return state
  }
}
