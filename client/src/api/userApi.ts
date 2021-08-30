import axios from "axios";
import {showPopup} from "../components/CommonComponents/PopupInfo/PopupInfo";
import {PopupTypeEnum} from "../type/types";

export const userRegistrationApi = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      'http://localhost:5000/api/auth/registration',
      {
        email,
        password,
      }
    )
    showPopup(PopupTypeEnum.info, response.data.message)
  } catch (e) {
    if(e.message === 'Network Error'){
      showPopup(PopupTypeEnum.alarm, e.name + ': ' + e.message)
    } else {
      console.log(e.response)
      showPopup(PopupTypeEnum.alarm, e.response.data.message)
    }

  }
}