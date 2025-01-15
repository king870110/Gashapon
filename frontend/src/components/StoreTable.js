import React from "react"
import { Table, Button } from "react-bootstrap"

const StoreTable = ({ stores, onEdit, onDelete, onClose }) => {
	return (
		<div>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th style={{ width: "50px" }}>ID</th>
						<th style={{ width: "200px" }}>商店名稱</th>
						<th style={{ width: "400px" }}>地址</th>
						<th style={{ width: "250px" }}>操作</th>
					</tr>
				</thead>
				<tbody>
					{stores.map((store) => (
						<tr key={store.id}>
							<td>{store.id}</td>
							<td>{store.name}</td>
							<td>{store.address}</td>
							<td>
								<Button
									variant="primary"
									size="sm"
									className="me-2"
									onClick={() => onClose(store.id)}
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
								<Button
									variant="secondary"
									size="sm"
									onClick={() => onClose(store.id)}
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

export default StoreTable
