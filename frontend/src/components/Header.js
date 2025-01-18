import React, { useContext } from "react"
import { Navbar, Nav, Container, Button, Image } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

const Header = () => {
	const { loggedIn, role, logout } = useContext(AuthContext)
	const navigate = useNavigate()

	const handleLogout = () => {
		logout()
		navigate("/login")
	}

	return (
		<Navbar bg="dark" variant="dark" expand="lg" className="fix-top">
			<Container>
				<Image
					src="/images/happycat.jpeg"
					alt="logo"
					style={{
						width: "50px",
						height: "auto",
						padding: "0px 10px 0px 0px",
						cursor: "pointer",
					}}
					onClick={() => (window.location.href = "/")}
				/>
				<Navbar.Brand as={Link} to="/">
					Gashapon Map
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link as={Link} to="/shop">
							商店地圖
						</Nav.Link>
						<Nav.Link as={Link} to="/product">
							商品介紹
						</Nav.Link>
						<Nav.Link as={Link} to="/notices">
							注意事項
						</Nav.Link>
						{(role === "ADMIN" || role === "MERCHANT") && (
							<Nav.Link as={Link} to="/admin/store-management">
								後台管理
							</Nav.Link>
						)}
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
