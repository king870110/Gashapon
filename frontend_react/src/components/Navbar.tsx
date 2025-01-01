import React from "react"
import { Link } from "react-router-dom"

const Navbar: React.FC = () => {
	return (
		<nav className="navbar">
			<div className="container">
				<Link to="/" className="logo">
					Gashapon Map
				</Link>
				<div className="nav-links">
					<Link to="/">首頁</Link>
					<Link to="/stores">商店</Link>
					<Link to="/products">商品</Link>
					<Link to="/admin/stores">商店管理</Link>
					<Link to="/admin/products">商品管理</Link>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
