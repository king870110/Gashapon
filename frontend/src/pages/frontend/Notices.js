import React from "react"
import { Tab, Row, Col, ListGroup, Container } from "react-bootstrap"

const qaList = [
	{
		question: "如何確認我的訂單是否成功？",
		answer: "成功下單後，您會收到確認郵件或簡訊通知。",
	},
	{
		question: "我可以修改或取消訂單嗎？",
		answer: "若訂單尚未出貨，您可聯繫客服協助修改或取消。",
	},
	{
		question: "如何追蹤我的訂單？",
		answer: "您可以登入會員中心查看訂單狀態。",
	},
	{
		question: "如何聯繫客服？",
		answer: "您可以通過網站上的聯繫表單或客服電話與我們聯繫。",
	},
	{
		question: "支援哪些付款方式？",
		answer:
			"我們提供信用卡、電子支付（如 PayPal、Apple Pay及銀行轉帳等多種付款方式。",
	},
	{
		question: "如何查看訂單狀態？",
		answer: "您可以登入會員中心查看訂單狀態。",
	},
	{
		question: "付款失敗該怎麼辦？",
		answer: "請檢查網路連線、卡片有效性或聯繫客服協助處理。",
	},
]

const Notices = () => {
	return (
		<Container>
			<Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
				<h1 className="my-4">注意事項</h1>
				<Row>
					<Col sm={4}>
						<ListGroup>
							{qaList.map((qa, index) => (
								<ListGroup.Item
									key={index} // Add a unique key
									action
									href={"#" + index}
								>
									{qa.question}
								</ListGroup.Item>
							))}
						</ListGroup>
					</Col>
					<Col sm={8}>
						<Tab.Content>
							{qaList.map((qa, index) => (
								<Tab.Pane
									key={index} // Add a unique key
									eventKey={"#" + index}
								>
									{qa.answer}
								</Tab.Pane>
							))}
						</Tab.Content>
					</Col>
				</Row>
			</Tab.Container>
		</Container>
	)
}

export default Notices
