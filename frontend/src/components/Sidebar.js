import React from "react"
import { Nav } from "react-bootstrap"
import { Link } from "react-router-dom"

const Sidebar = () => {
	return (
		<Nav className="col-md-12 d-none d-md-block bg-light sidebar">
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
		</Nav>
	)
}

export default Sidebar
