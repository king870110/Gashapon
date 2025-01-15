import React, { useContext } from "react"
import { Navbar, Nav, Container, Button, Image } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

const Sidebar = () => {
	const { loggedIn, logout } = useContext(AuthContext)
	const navigate = useNavigate()

	const handleLogout = () => {
		logout()
		navigate("/login")
	}

	return (
		<Navbar bg="dark" variant="dark" expand="lg">
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
						<div className="sidebar-sticky"></div>
						<Nav.Item>
							<Nav.Link as={Link} to="/admin/store-management">
								商店管理
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link as={Link} to="/admin/product-management">
								商品管理
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link as={Link} to="/admin/image-management">
								圖庫管理
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link as={Link} to="/">
								回到前台
							</Nav.Link>
						</Nav.Item>
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

export default Sidebar
