import React from "react"
import { Table, Button } from "react-bootstrap"
import Switch from "../components/Switch"

const ProductTable = ({ products, onEdit, onDelete, onChangeStatus }) => {
	return (
		<div>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th style={{ width: "5%" }}>ID</th>
						<th style={{ width: "15%" }}>名稱</th>
						<th style={{ width: "20%" }}>簡圖</th>
						<th style={{ width: "20%" }}>類別</th>
						<th style={{ width: "10%" }}>價格</th>
						<th style={{ width: "10%" }}>狀態</th>
						<th style={{ width: "10%" }}>操作</th>
					</tr>
				</thead>
				<tbody>
					{products.map((product) => (
						<tr key={product.id}>
							<td className="vertical-center ">{product.id}</td>
							<td className="vertical-center">{product.name}</td>
							<td className="vertical-center">
								<img
									src={`http://127.0.0.1:3000${product?.image?.url}`}
									alt={""}
									style={{ maxWidth: "100px", height: "auto" }} // 限制圖片大小
								/>
							</td>
							<td className="vertical-center">
								{product.category?.name || "無"}
							</td>
							<td className="vertical-center">{product.price}</td>
							<td className="vertical-center ">
								<Switch
									isChecked={product.isActive} // 直接使用 product.isActive
									onChange={(checked) => onChangeStatus(product.id, checked)} // 傳遞 onChange
								/>
							</td>
							<td className="vertical-center">
								<Button
									variant="warning"
									size="sm"
									className="me-2"
									onClick={() => onEdit(product.id)}
								>
									編輯
								</Button>
								<Button
									variant="danger"
									size="sm"
									className="me-2"
									onClick={() => onDelete(product.id)}
								>
									刪除
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	)
}

export default ProductTable
