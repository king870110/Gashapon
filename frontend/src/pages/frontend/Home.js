import React from "react"
import { Container, Row, Col, Image } from "react-bootstrap"
import ImageCarousel from "../../components/Carousel"

const Home = () => {
	return (
		<Container>
			<ImageCarousel />
			<Row>
				<Col md={4}>
					<Image src="/images/activity1.jpg" thumbnail />
				</Col>
				<Col md={4}>
					<Image src="/images/activity2.jpg" thumbnail />
				</Col>
				<Col md={4}>
					<Image src="/images/activity3.jpg" thumbnail />
				</Col>
			</Row>
		</Container>
	)
}

export default Home
