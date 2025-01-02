import React from "react"
import Sidebar from "../components/Sidebar"

const BackendLayout = ({ children }) => {
	return (
		<div className="d-flex">
			<Sidebar />
			<main className="flex-grow-1">{children}</main>
		</div>
	)
}

export default BackendLayout
