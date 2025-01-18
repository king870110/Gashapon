import React from "react"
import { Card } from "react-bootstrap"

const StoreCard = ({ store, onClick }) => {
	return (
		<Card style={{ width: "90%" }} onClick={onClick}>
			<Card.Body>
				<Card.Title style={{ margin: "5px 0 0 0" }} className="mb-2">
					{store?.name}
				</Card.Title>
				<Card.Text className="mb-0">地址：{store?.address}</Card.Text>
				<Card.Text className="mb-0">描述：{store?.description}</Card.Text>
				{/* <Button variant="primary">查看詳情</Button> */}
			</Card.Body>
		</Card>
	)
}

export default StoreCard
