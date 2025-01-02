// import React, { useState } from "react"

// const LoginForm = ({ onSubmit }) => {
// 	const [email, setEmail] = useState("")
// 	const [password, setPassword] = useState("")

// 	const handleSubmit = (e) => {
// 		e.preventDefault()
// 		onSubmit({ email, password })
// 	}

// 	return (
// 		<form onSubmit={handleSubmit} className="p-4 shadow-sm bg-light rounded">
// 			<h2 className="mb-4">Login</h2>
// 			<div className="mb-3">
// 				<label htmlFor="email" className="form-label">
// 					Email
// 				</label>
// 				<input
// 					type="email"
// 					id="email"
// 					className="form-control"
// 					value={email}
// 					onChange={(e) => setEmail(e.target.value)}
// 					required
// 				/>
// 			</div>
// 			<div className="mb-3">
// 				<label htmlFor="password" className="form-label">
// 					Password
// 				</label>
// 				<input
// 					type="password"
// 					id="password"
// 					className="form-control"
// 					value={password}
// 					onChange={(e) => setPassword(e.target.value)}
// 					required
// 				/>
// 			</div>
// 			<button type="submit" className="btn btn-primary w-100">
// 				Login
// 			</button>
// 		</form>
// 	)
// }

// export default LoginForm
