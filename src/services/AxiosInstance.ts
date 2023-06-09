import axios from "axios";


const access_token = localStorage.getItem("token");

function authHeader() {
  if (access_token) {
    return {
      baseURL: `${BASE_URL}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    };
  } else {
    return {
      baseURL: `${BASE_URL}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
  }
}

const {
  NODE_ENV,
  REACT_APP_BASE_URL_DEV,
  REACT_APP_BASE_URL_PROD,
} = process.env;

const BASE_URL =
  NODE_ENV === "development"
    ? REACT_APP_BASE_URL_DEV
    : REACT_APP_BASE_URL_PROD;

const AxiosInstance = axios.create(authHeader());

export default AxiosInstance;
