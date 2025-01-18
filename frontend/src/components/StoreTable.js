import React from "react"
import { Table, Button } from "react-bootstrap"
import Switch from "../components/Switch"

const StoreTable = ({
	stores,
	onEdit,
	onDelete,
	onClose,
	onChangeStatus,
	onShowStoreProductModal,
}) => {
	return (
		<div>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th style={{ width: "10%" }}>ID</th>
						<th style={{ width: "15%" }}>商店名稱</th>
						<th style={{ width: "25%" }}>地址</th>
						<th style={{ width: "10%" }}>狀態</th>
						<th style={{ width: "20%" }}>操作</th>
					</tr>
				</thead>
				<tbody>
					{stores.map((store) => (
						<tr key={store.id}>
							<td>{store.id}</td>
							<td>{store.name}</td>
							<td>{store.address}</td>
							<td className="vertical-center ">
								<Switch
									isChecked={store.isActive} // 直接使用 product.isActive
									onChange={(checked) => onChangeStatus(store.id, checked)} // 傳遞 onChange
								/>
							</td>
							<td>
								<Button
									variant="primary"
									size="sm"
									className="me-2"
									onClick={() => onShowStoreProductModal(store.id)}
								>
									商品
								</Button>
								<Button
									variant="warning"
									size="sm"
									className="me-2"
									onClick={() => onEdit(store.id)}
								>
									編輯
								</Button>
								<Button
									variant="danger"
									size="sm"
									className="me-2"
									onClick={() => onDelete(store.id)}
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

export default StoreTable
