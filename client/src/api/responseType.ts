import {UserType} from "../type/types";

export type RegistrationResponseType = {
  message: string;
}

export type LoginResponseType = {
  token: string,
  user: UserType,
}