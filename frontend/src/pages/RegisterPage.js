import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

function RegisterPage() {
	const navigate = useNavigate()
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		name: "",
		full_name: "",
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
			await axios.post("/api/auth/register", formData)
			navigate("/login", { state: { message: "註冊成功，請登入" } })
		} catch (error) {
			setError(error.response?.data?.message || "註冊失敗，請稍後再試")
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
					註冊新帳號
				</h2>
				<p className="mt-2 text-center text-sm text-gray-600">
					已經有帳號？{" "}
					<Link
						to="/login"
						className="font-medium text-indigo-600 hover:text-indigo-500"
					>
						登入
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
								htmlFor="name"
								className="block text-sm font-medium text-gray-700"
							>
								使用者名稱
							</label>
							<div className="mt-1">
								<input
									id="name"
									name="name"
									type="text"
									required
									value={formData.name}
									onChange={handleChange}
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="full_name"
								className="block text-sm font-medium text-gray-700"
							>
								全名
							</label>
							<div className="mt-1">
								<input
									id="full_name"
									name="full_name"
									type="text"
									value={formData.full_name}
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

						<div>
							<button
								type="submit"
								disabled={loading}
								className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
									loading && "opacity-50 cursor-not-allowed"
								}`}
							>
								{loading ? "註冊中..." : "註冊"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default RegisterPage
