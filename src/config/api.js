import axios from "axios";
import { notifyError } from "../utilities/toastify";

const Api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    'Content-Type': 'application/json',
  },
});

export const handleApiError = (error) => {
  console.log(error);
  try {
    if (Array.isArray(error?.response?.data)) {
      error.response.data.map((e) => notifyError(e.message));
    } else {
      const errorMes =
        error.response?.data?.error || error.response?.data?.message;
      notifyError(errorMes);
    }
    return error.response.data.error;
  } catch (error) {
    console.log(error);
  }
};


export const apiUrl = "http://localhost:5000/api"
export default Api
