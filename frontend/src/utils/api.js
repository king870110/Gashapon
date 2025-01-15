import axios from "axios"

const api = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_URL || "http://localhost:3000",
	// baseURL: process.env.REACT_APP_API_URL || "/api",
})

api.interceptors.response.use(
	(response) => response,
	(error) => {
		console.error("Axios error:", error.response?.data || error.message)
		return Promise.reject(error)
	}
)

export default api
