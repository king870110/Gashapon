import React from "react"
import { Card } from "react-bootstrap"

const ProductCard = ({ product }) => {
	return (
		<Card style={{ width: "90%" }}>
			<Card.Img variant="top" src={product?.imageUrl} />
			<Card.Body>
				<Card.Img
					variant="top"
					src={`http://127.0.0.1:3000${product?.image?.url}`}
				></Card.Img>
				<Card.Title style={{ margin: "5px 0 0 0" }}>{product?.name}</Card.Title>
				<Card.Text>${product?.price}</Card.Text>
				{/* <Button variant="primary">查看詳情</Button> */}
			</Card.Body>
		</Card>
	)
}

export default ProductCard
