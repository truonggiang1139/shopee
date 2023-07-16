import { ACCESS_TOKEN_KEY } from "./constants";
import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";
import { AuthResponse } from "src/types/auth.types";
class Http {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: "https://api-ecom.duthanhduoc.com/",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json"
      }
    });
    this.instance.interceptors.request.use(
      (config) => {
        const accessToken = Cookies.get(ACCESS_TOKEN_KEY);
        if (accessToken && config.headers) {
          config.headers.authorization = accessToken;

          return config;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config;
        if (url === "/login" || url === "/register") {
          const token = (response.data as AuthResponse).data.access_token;
          Cookies.set(ACCESS_TOKEN_KEY, token, { expires: 7 });
        } else if (url === "/logout") {
          Cookies.remove(ACCESS_TOKEN_KEY);
        }
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
}

const http = new Http().instance;

export default http;
