import React from "react"
import { Container, Row, Col, Image } from "react-bootstrap"

const Home = () => {
	return (
		<Container>
			{/* <br></br>
			<Row className="d-flex justify-content-center align-items-center">
				<Col md={12} className="text-center">
					<Image src="/images/img_keyvisual_pc.png" thumbnail />
				</Col>
			</Row> */}
			<br></br>
			<Row className="d-flex justify-content-center align-items-center">
				<Col md={8} className="text-center">
					<Image
						className="hover-image"
						src="/images/3realcats.jpeg"
						thumbnail
						style={{ width: "90%" }}
					/>
				</Col>
				<Col md={4} className="text-center">
					<Row>
						<Image
							className="keepImageRatio hover-image"
							src="/images/2red1blue.jpeg"
							thumbnail
							style={{ width: "90%" }}
						/>
					</Row>
					<Row>
						<Image
							className="keepImageRatio hover-image"
							src="/images/3cats3colors.jpeg"
							thumbnail
							style={{ width: "90%" }}
						/>
					</Row>
				</Col>
			</Row>
			<br></br>
			<br></br>
			<br></br>
			<br></br>
		</Container>
	)
}

export default Home
