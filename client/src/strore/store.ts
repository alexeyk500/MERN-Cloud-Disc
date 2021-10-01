import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducerUser, {UsersActions} from "./reducerUser";
import reducerFile, {FileActions} from "./reducerFile";
import reducerUpload, {UploadActions} from "./reducerUpload";

import reducerApp, {appActionsType} from "./reducerApp";

const rootReducer = combineReducers({
  user: reducerUser,
  file: reducerFile,
  upload: reducerUpload,
  app: reducerApp
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export type AllActions = UsersActions | FileActions | UploadActions | appActionsType;
export type StateType = ReturnType<typeof store.getState>