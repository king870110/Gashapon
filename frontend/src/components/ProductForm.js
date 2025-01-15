import React, { useState, useEffect } from "react"
import { Modal, Form, Button } from "react-bootstrap"
import ImageForm from "../components/ImageForm"
import api from "../utils/api"

const ProductForm = ({
	showModal,
	handleCloseModal,
	product,
	handleInputChange,
	handleAddOrUpdateProduct,
}) => {
	const [showGallery, setShowGallery] = useState(false)
	const [showImageForm, setShowImageForm] = useState(false)
	const [images, setImages] = useState([])

	useEffect(() => {
		const fetchImages = async () => {
			try {
				const response = await api.get("/images")
				setImages(response.data)
			} catch (error) {
				console.error("Failed to fetch images:", error)
			}
		}

		fetchImages()
	}, [])

	const handleSelectImage = (imageId) => {
		handleInputChange({ target: { name: "imageId", value: imageId } })
		setShowGallery(false)
	}
	const handleShowImageModal = () => {
		setShowImageForm(true)
	}

	const handleCloseGallery = () => setShowGallery(false)
	const handleCloseImageForm = () => setShowImageForm(false)

	return (
		<>
			<Modal show={showModal} onHide={handleCloseModal}>
				<Modal.Header closeButton>
					<Modal.Title>{product?.id ? "編輯商品" : "新增商品"}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group controlId="formProductName">
							<Form.Label>商品名稱</Form.Label>
							<Form.Control
								type="text"
								placeholder="輸入商品名稱"
								name="name"
								value={product?.name || ""}
								onChange={handleInputChange}
							/>
						</Form.Group>
						<Form.Group controlId="formProductPrice" className="mt-3">
							<Form.Label>價格</Form.Label>
							<Form.Control
								type="number"
								placeholder="輸入價格"
								name="price"
								value={product?.price || ""}
								onChange={handleInputChange}
							/>
						</Form.Group>
						<Form.Group controlId="formProductImage" className="mt-3">
							<Form.Label>照片　</Form.Label>
							<Button variant="secondary" onClick={() => setShowGallery(true)}>
								選擇照片
							</Button>
							{product?.imageId && (
								<div className="mt-2" style={{ margin: "0 0 0 45px" }}>
									<img
										src={
											"http://127.0.0.1:3000" +
											images.find((img) => img.id === product.imageId)?.url
										}
										alt="Selected"
										style={{ width: "80%" }}
									/>
								</div>
							)}
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleCloseModal}>
						取消
					</Button>
					<Button variant="primary" onClick={handleAddOrUpdateProduct}>
						{product?.id ? "更新" : "新增"}
					</Button>
				</Modal.Footer>
			</Modal>

			{/* 圖庫模態框 */}
			<Modal show={showGallery} onHide={() => setShowGallery(false)}>
				<Modal.Header closeButton>
					<Modal.Title>選擇照片</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="d-flex flex-wrap">
						{images.map((image) => (
							<div
								key={image.id}
								className="m-2"
								style={{ cursor: "pointer" }}
								onClick={() => handleSelectImage(image.id)}
							>
								<img
									src={"http://127.0.0.1:3000" + image.url}
									alt={image.fileName || "未命名"}
									style={{ width: "100px", height: "100px" }}
								/>
							</div>
						))}
						<div
							className="m-2"
							style={{ cursor: "pointer", padding: "20px" }}
							onClick={() => handleShowImageModal()}
							// 新增圖片
						>
							<img
								src={"/images/add_button.png"}
								alt={"新增圖片"}
								style={{ width: "50px", height: "50px" }}
							/>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleCloseGallery}>
						關閉
					</Button>
				</Modal.Footer>
			</Modal>

			<ImageForm
				showModal={showImageForm}
				handleCloseModal={handleCloseImageForm}
				handleInputChange={handleInputChange}
			/>
		</>
	)
}

export default ProductForm
