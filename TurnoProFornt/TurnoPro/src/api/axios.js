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

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true

      try {
        const user = JSON.parse(localStorage.getItem("user"))

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}token/refresh/`,
          {
            refresh: user.refresh,
          }
        )

        user.access = response.data.access
        localStorage.setItem("user", JSON.stringify(user))

        originalRequest.headers.Authorization = `Bearer ${response.data.access}`

        return api(originalRequest)
      } catch (err) {
        localStorage.removeItem("user")
        window.location.href = "/login"
        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  }
)

export default api
