import {UserType} from "../type/types";

type userStateType = {
  currentUser: UserType | null,
  isAuth: boolean,
}

const defaultUserState: userStateType = {
  currentUser: null,
  isAuth: false,
}

const SET_USER = 'SET_USER';
type setUserType = {
  type: typeof SET_USER,
  payload: UserType
}
export const setUser = (user: UserType): setUserType => ({type: SET_USER, payload: user})

const LOGOUT_USER = 'LOGOUT_USER';
type logoutUserType = {
  type: typeof LOGOUT_USER
}
export const logoutUser = (): logoutUserType => ({type: LOGOUT_USER})

export type UsersActions = setUserType | logoutUserType

export default function reducerUser(state = defaultUserState, action: UsersActions): typeof defaultUserState {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state, currentUser: action.payload, isAuth: true
      }
    }
    case LOGOUT_USER: {
      localStorage.removeItem('token');
      return {
        ...state, currentUser: null, isAuth: false
      }
    }
    default:
      return state
  }
}



