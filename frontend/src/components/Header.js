import React, { useState, useEffect } from "react"
import { Navbar, Nav, Container, Button } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { isAuthenticated, removeToken } from "../utils/auth"

const Header = () => {
	const [loggedIn, setLoggedIn] = useState(false)
	const navigate = useNavigate()

	// 检查用户是否已经登录
	useEffect(() => {
		setLoggedIn(isAuthenticated())
	}, [])

	// 处理登出
	const handleLogout = () => {
		removeToken()
		setLoggedIn(false)
		navigate("/login")
	}

	return (
		<Navbar bg="dark" variant="dark" expand="lg">
			<Container>
				<Navbar.Brand as={Link} to="/">
					Gashapon Map
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link as={Link} to="/shop">
							商店
						</Nav.Link>
						<Nav.Link as={Link} to="/product">
							商品
						</Nav.Link>
						<Nav.Link as={Link} to="/notices">
							注意事項
						</Nav.Link>
					</Nav>
					<Nav>
						{loggedIn ? (
							<Button variant="outline-light" onClick={handleLogout}>
								登出
							</Button>
						) : (
							<Nav.Link as={Link} to="/login">
								登入
							</Nav.Link>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Header
