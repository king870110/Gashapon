import React, { useState } from "react"
import { Container, Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import api from "../../utils/api"

const Register = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [name, setName] = useState("")
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			await api.post("/users", { email, password, name })
			alert("註冊成功，請登入。")
			navigate("/login")
		} catch (error) {
			console.error("Registration failed:", error)
			alert("註冊失敗，請檢查您的資料。")
		}
	}

	return (
		<Container>
			<h1 className="my-4">註冊</h1>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="formName">
					<Form.Label>姓名</Form.Label>
					<Form.Control
						type="text"
						placeholder="輸入姓名"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</Form.Group>

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
					註冊
				</Button>
			</Form>
		</Container>
	)
}

export default Register
