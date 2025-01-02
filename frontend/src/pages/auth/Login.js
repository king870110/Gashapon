import React, { useState } from "react"
import { Container, Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import api from "../../utils/api"
import { setToken } from "../../utils/auth"

const Login = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const navigate = useNavigate()

	const handleLogin = async (e) => {
		e.preventDefault()
		try {
			const response = await api.post("/auth/login", { email, password })
			setToken(response.data.access_token)
			navigate("/")
		} catch (error) {
			console.error("Login failed:", error)
			alert("登入失敗，請檢查您的憑證。")
		}
	}

	const handleRegister = async () => {
		try {
			const registerResponse = await api.post("/users/register", {
				email,
				password,
				name: "新用戶",
			})
			console.log(registerResponse)
			const response = await api.post("/auth/login", { email, password })
			setToken(response.data.access_token)
			alert("註冊成功，已自動登入。")
			navigate("/")
		} catch (error) {
			console.error("Registration failed:", error)
			alert("註冊失敗，請檢查您的資料。")
		}
	}

	return (
		<Container>
			<h1 className="my-4">登入</h1>
			<Form onSubmit={handleLogin}>
				<Form.Group controlId="formEmail">
					<Form.Label>電子郵件</Form.Label>
					<Form.Control
						type="email"
						placeholder="輸入電子郵件"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Form.Group>

				<Form.Group controlId="formPassword">
					<Form.Label>密碼</Form.Label>
					<Form.Control
						type="password"
						placeholder="輸入密碼"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Group>

				<Button variant="primary" type="submit" className="mt-3">
					登入
				</Button>
				<Button
					variant="secondary"
					className="mt-3 ms-2"
					onClick={handleRegister}
				>
					註冊
				</Button>
			</Form>
		</Container>
	)
}

export default Login
