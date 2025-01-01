import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

function LoginPage() {
	const navigate = useNavigate()
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	})
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError("")
		setLoading(true)

		try {
			const response = await axios.post("/api/auth/login", formData)
			localStorage.setItem("token", response.data.token)
			localStorage.setItem("user", JSON.stringify(response.data.user))

			// 根據用戶角色導向不同頁面
			if (response.data.user.role === "ADMIN") {
				navigate("/admin")
			} else {
				navigate("/")
			}
		} catch (error) {
			setError(error.response?.data?.message || "登入失敗，請檢查您的帳號密碼")
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
					登入您的帳號
				</h2>
				<p className="mt-2 text-center text-sm text-gray-600">
					或{" "}
					<Link
						to="/register"
						className="font-medium text-indigo-600 hover:text-indigo-500"
					>
						註冊新帳號
					</Link>
				</p>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
					{error && (
						<div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative">
							{error}
						</div>
					)}

					<form className="space-y-6" onSubmit={handleSubmit}>
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700"
							>
								電子郵件
							</label>
							<div className="mt-1">
								<input
									id="email"
									name="email"
									type="email"
									required
									value={formData.email}
									onChange={handleChange}
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700"
							>
								密碼
							</label>
							<div className="mt-1">
								<input
									id="password"
									name="password"
									type="password"
									required
									value={formData.password}
									onChange={handleChange}
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
								/>
							</div>
						</div>

						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<input
									id="remember_me"
									name="remember_me"
									type="checkbox"
									className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
								/>
								<label
									htmlFor="remember_me"
									className="ml-2 block text-sm text-gray-900"
								>
									記住我
								</label>
							</div>

							<div className="text-sm">
								<Link
									to="/forgot-password"
									className="font-medium text-indigo-600 hover:text-indigo-500"
								>
									忘記密碼？
								</Link>
							</div>
						</div>

						<div>
							<button
								type="submit"
								disabled={loading}
								className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
									loading && "opacity-50 cursor-not-allowed"
								}`}
							>
								{loading ? "登入中..." : "登入"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default LoginPage
