import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"))

    if (user?.access) {
      config.headers.Authorization = `Bearer ${user.access}`
    }

    return config
  },
  (error) => Promise.reject(error)
)


export default api
