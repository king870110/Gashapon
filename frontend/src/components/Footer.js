import React from "react"
import { Container } from "react-bootstrap"

const Footer = () => {
	return (
		<footer className="bg-dark text-white p-3 text-center fixed-bottom">
			<Container>
				<p style={{ margin: "0" }}>© 2023 Gashapon Map. All rights reserved.</p>
			</Container>
		</footer>
	)
}

export default Footer
