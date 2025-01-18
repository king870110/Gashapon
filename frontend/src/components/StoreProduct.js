import React, { useState, useEffect } from "react"
import { Modal, Form, Button, Row, Col, Container } from "react-bootstrap"
import api from "../utils/api"

const StoreProduct = ({
	store,
	showStoreProductModal,
	handleCloseModal,
	updateStore,
}) => {
	const [products, setProducts] = useState([])
	const [selectedProducts, setSelectedProducts] = useState([])
	const filteredProducts = products.filter((product) => !!product.isActive)
	useEffect(() => {
		const fetchProducts = async () => {
			try {
				console.log({ store })
				const response = await api.get("/products")
				console.log({ response })
				setProducts(response.data)

				// 當模態框打開時，重新初始化 selectedProducts
				if (showStoreProductModal && store?.products) {
					setSelectedProducts(store.products.map((product) => product.id))
				}
			} catch (error) {
				console.error("Failed to fetch stores:", error)
			}
		}

		fetchProducts()
	}, [showStoreProductModal, store])

	const handleCheckboxChange = (id) => {
		setSelectedProducts(
			(prevSelected) =>
				prevSelected.includes(id)
					? prevSelected.filter((photoId) => photoId !== id) // 取消選中
					: [...prevSelected, id] // 選中
		)
	}

	const handleAddOrUpdateStoreProduct = async () => {
		try {
			const data = {
				products: selectedProducts.map((id) => String(id)), // 將 ID 轉換為數字字符串
			}

			console.log({ data })
			const response = await api.put(
				`/stores/${store.id}/products`, // 使用改進後的路徑
				data
			)
			console.log({ response })
			updateStore(response.data)
			handleCloseModal()
		} catch (error) {
			console.error("Failed to add or update store:", error)
		}
	}

	const handleClose = () => {
		setSelectedProducts([]) // 重置 selectedProducts
		handleCloseModal() // 調用父組件傳遞的關閉函數
	}

	return (
		<Modal show={showStoreProductModal} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>編輯商品</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group controlId="formStoreName">
						<Form.Label>商店名稱</Form.Label>
						<Form.Control
							type="text"
							placeholder="輸入商店名稱"
							name="name"
							value={store?.name || ""}
							readOnly
						/>
					</Form.Group>
					<br />

					<h6>商品</h6>
					<Container>
						<Row>
							{/* <div style={{ display: "flex", flexWrap: "wrap" }}> */}
							{filteredProducts.map((product) => (
								<Col xs={3}>
									<label
										key={product.id}
										style={{
											position: "relative",
											cursor: "pointer",
										}}
										className="mb-3"
									>
										<img
											src={"http://127.0.0.1:3000" + product.image.url}
											alt={product.name}
											style={{
												width: "100px",
												height: "100px",
												border: "1px solid #ddd",
											}}
										/>
										<input
											type="checkbox"
											checked={selectedProducts.includes(product.id)}
											onChange={() => handleCheckboxChange(product.id)}
											style={{
												position: "absolute",
												top: "2px",
												left: "2px",
												zIndex: 1,
												width: "15px",
												height: "15px",
												cursor: "pointer",
												// opacity: 0, // 隱藏核選方塊
											}}
										/>
									</label>
								</Col>
							))}
							{/* </div> */}
						</Row>
					</Container>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					取消
				</Button>
				<Button variant="primary" onClick={handleAddOrUpdateStoreProduct}>
					確認
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default StoreProduct
