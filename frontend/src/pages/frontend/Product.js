import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import ProductCard from "../../components/ProductCard"

const Product = () => {
	const products = [
		{
			id: 1,
			name: "商品1",
			description: "描述1",
			imageUrl: "/images/product1.jpg",
		},
		{
			id: 2,
			name: "商品2",
			description: "描述2",
			imageUrl: "/images/product2.jpg",
		},
		// 更多商品...
	]

	return (
		<Container>
			<h1 className="my-4">商品列表</h1>
			<Row>
				{products.map((product) => (
					<Col key={product.id} md={4}>
						<ProductCard product={product} />
					</Col>
				))}
			</Row>
		</Container>
	)
}

export default Product
