import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import "../styles/LoginPage.css"

function LoginPage() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	})
	const [error, setError] = useState("")
	const navigate = useNavigate()

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const response = await axios.post(
				"http://localhost:3000/auth/login",
				formData
			)
			localStorage.setItem("token", response.data.token)
			localStorage.setItem("user", JSON.stringify(response.data.user))
			navigate("/")
		} catch (error) {
			setError(error.response?.data?.message || "登入失敗，請檢查帳號密碼")
		}
	}

	return (
		<div className="login-page">
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-md-6 col-lg-4">
						<div className="card login-card">
							<div className="card-body">
								<h2 className="text-center mb-4">登入</h2>
								{error && <div className="alert alert-danger">{error}</div>}
								<form onSubmit={handleSubmit}>
									<div className="mb-3">
										<label className="form-label">電子郵件</label>
										<input
											type="email"
											className="form-control"
											name="email"
											value={formData.email}
											onChange={handleChange}
											required
										/>
									</div>
									<div className="mb-3">
										<label className="form-label">密碼</label>
										<input
											type="password"
											className="form-control"
											name="password"
											value={formData.password}
											onChange={handleChange}
											required
										/>
									</div>
									<button type="submit" className="btn btn-primary w-100">
										登入
									</button>
								</form>
								<div className="text-center mt-3">
									<Link to="/register">還沒有帳號？立即註冊</Link>
								</div>
								<div className="text-center mt-2">
									<Link to="/">返回首頁</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LoginPage
