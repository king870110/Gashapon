import React from "react"
import { Table, Button } from "react-bootstrap"

const ImageTable = ({ images, onEdit, onDelete, onClose }) => {
	return (
		<div>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th style={{ width: "5%" }}>ID</th>
						<th style={{ width: "30%" }}>簡圖</th>
						<th style={{ width: "10%" }}>上傳者</th>
						<th style={{ width: "30%" }}>使用中的商品</th>
						<th style={{ width: "10%" }}>是否公開</th>
						<th style={{ width: "15%" }}>操作</th>
					</tr>
				</thead>
				<tbody>
					{images.map((image) => (
						<tr key={image.id}>
							<td>{image.id}</td>
							<td>{image.url}</td>
							<td>{image.user.name}</td>
							<td>{image.products?.map((product) => product.name).join(", ")}</td>
							<td>{image.isPublic ? "是" : "否"}</td>
							<td>
								<Button
									variant="warning"
									size="sm"
									className="me-2"
									onClick={() => onEdit(image.id)}
								>
									編輯
								</Button>
								<Button
									variant="danger"
									size="sm"
									className="me-2"
									onClick={() => onDelete(image.id)}
								>
									刪除
								</Button>
								<Button
									variant="secondary"
									size="sm"
									onClick={() => onClose(image.id)}
								>
									關閉
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	)
}

export default ImageTable
