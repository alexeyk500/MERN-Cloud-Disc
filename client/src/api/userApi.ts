import axios from "axios";
import {showPopup} from "../components/CommonComponents/PopupInfo/PopupInfo";
import {PopupTypeEnum} from "../type/types";
import {Dispatch} from "redux";
import {AllActions} from "../strore/store";
import {setUser} from "../strore/reducerUser";
import {LoginResponseType, RegistrationResponseType} from "./responseType";
import {apiUrl} from "../config";

export const userRegistrationApi = async (email: string, password: string) => {
  try {
    const response = await axios.post<RegistrationResponseType>(
      `${apiUrl}/api/auth/registration`,
      {
        email,
        password,
      }
    )
    showPopup(PopupTypeEnum.info, response.data.message)
  } catch (e) {
    if (e.message === 'Network Error') {
      showPopup(PopupTypeEnum.alarm, e.name + ': ' + e.message)
    } else {
      console.log(e.response)
      showPopup(PopupTypeEnum.alarm, e.response.data.message)
    }
  }
};

export const userLoginApi = (email: string, password: string) => {
  return async (dispatch: Dispatch<AllActions>) => {
    try {
      const response = await axios.post<LoginResponseType>(
        `${apiUrl}/api/auth/login`,
        {
          email,
          password,
        }
      )
      localStorage.setItem('token', response.data.token)
      dispatch(setUser(response.data.user))
    } catch (e) {
      if (e.message === 'Network Error') {
        showPopup(PopupTypeEnum.alarm, e.name + ': ' + e.message)
      } else {
        console.log(e.response)
        showPopup(PopupTypeEnum.alarm, e.response.data.message)
      }
    }
  }
};

export const userAuthApiByJWTFromLocalStorage = () => {
  return async (dispatch: Dispatch<AllActions>) => {
    try {
      const response = await axios.get<LoginResponseType>(
        `${apiUrl}/api/auth/auth`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      dispatch(setUser(response.data.user))
      localStorage.setItem('token', response.data.token)
    } catch (e) {
      if (e.message === 'Network Error') {
        showPopup(PopupTypeEnum.alarm, e.name + ': ' + e.message)
      } else {
        console.log(e.response)
        localStorage.removeItem('token')
        showPopup(PopupTypeEnum.alarm, e.response.data.message)
      }
    }
  }
};
