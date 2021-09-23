import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducerUser, {UsersActions} from "./reducerUser";
import reducerFile, {FileActions} from "./reducerFile";
import uploadReducer, {UploadActions} from "./reducerUpload";

const rootReducer = combineReducers({
  user: reducerUser,
  file: reducerFile,
  upload: uploadReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export type AllActions = UsersActions | FileActions | UploadActions;
export type StateType = ReturnType<typeof store.getState>