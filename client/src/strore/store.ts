import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducerUser from "./reducerUser";
import reducerFile from "./reducerFile";

const rootReducer = combineReducers({
  user: reducerUser,
  file: reducerFile,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))