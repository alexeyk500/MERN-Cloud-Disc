const SHOW_LOADER = 'SHOW_LOADER';
type showLoaderType = {
  type: typeof SHOW_LOADER
}
export const showLoader = ():showLoaderType => {
  return ({type: SHOW_LOADER})
}

const HIDE_LOADER = 'HIDE_LOADER';type hideLoaderType = {
  type: typeof HIDE_LOADER
}
export const hideLoader = ():hideLoaderType => {
  return ({type: HIDE_LOADER})
}

export type appActionsType = showLoaderType | hideLoaderType

type DefaultStateType = {
  isLoader: boolean
}
const defaultState: DefaultStateType = {
  isLoader: false
}

export default function reducerApp (state = defaultState, action:appActionsType): DefaultStateType {
  switch (action.type) {
    case SHOW_LOADER: {
      return {...state, isLoader: true}
    }
    case HIDE_LOADER: {
      return {...state, isLoader: false}
    }
    default: return state
  }
}


