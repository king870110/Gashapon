import React from "react"
import { Link, useNavigate } from "react-router-dom"
import "../styles/Navbar.css"

function Navbar() {
	const navigate = useNavigate()
	const user = JSON.parse(localStorage.getItem("user"))

	const handleLogout = () => {
		localStorage.removeItem("user")
		localStorage.removeItem("token")
		navigate("/login")
	}

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-white">
			<div className="container">
				<Link className="navbar-brand" to="/">
					扭蛋地圖
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav me-auto">
						<li className="nav-item">
							<Link className="nav-link" to="/">
								地圖
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/products">
								商品
							</Link>
						</li>
					</ul>
					<div className="d-flex">
						{user ? (
							<>
								<span className="navbar-text me-3">歡迎, {user.name}</span>
								<button
									className="btn btn-outline-danger"
									onClick={handleLogout}
								>
									登出
								</button>
							</>
						) : (
							<>
								<Link to="/login" className="btn btn-outline-primary me-2">
									登入
								</Link>
								<Link to="/register" className="btn btn-primary">
									註冊
								</Link>
							</>
						)}
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
