import React from "react"
import Sidebar from "../components/Header_backend"
import Footer from "../components/Footer"

const FrontendLayout = ({ children }) => {
	return (
		<>
			<Sidebar />
			<main>{children}</main>
			<Footer />
		</>
	)
}

export default FrontendLayout
