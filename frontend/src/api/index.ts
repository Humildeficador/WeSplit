import axios from "axios";
import { TOKEN_KEY } from "../constants/tokenKey";

export const api = axios.create({
  baseURL: "http://localhost:3333"
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use((response) => response, (error) => {
  const isLoginRequest = error.config?.url?.includes("/auth")

  if (error.response?.status === 401 && !isLoginRequest) {
    localStorage.removeItem(TOKEN_KEY)
    window.location.href = '/'
  }

  return Promise.reject(error)
})