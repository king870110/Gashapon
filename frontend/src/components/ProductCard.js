import React from "react"
import { Card, Button } from "react-bootstrap"

const ProductCard = ({ product }) => {
	return (
		<Card style={{ width: "18rem" }}>
			<Card.Img variant="top" src={product.imageUrl} />
			<Card.Body>
				<Card.Title>{product.name}</Card.Title>
				<Card.Text>{product.description}</Card.Text>
				<Button variant="primary">查看詳情</Button>
			</Card.Body>
		</Card>
	)
}

export default ProductCard
