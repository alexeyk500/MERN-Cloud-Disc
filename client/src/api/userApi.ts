import axios from "axios";

export const userRegistrationApi = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      'http://localhost:5000/api/auth/registration',
      {
        email,
        password,
      }
    )
    console.log(response.data.message)
  } catch (e) {
    console.log(e.response.data.message)
  }
}