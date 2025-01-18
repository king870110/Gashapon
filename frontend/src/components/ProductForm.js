import React, { useState, useEffect, useContext } from "react"
import { Modal, Form, Button } from "react-bootstrap"
import ImageForm from "../components/ImageForm"
import { AuthContext } from "../context/AuthContext"
import api from "../utils/api"
import { MdOutlineAddBox } from "react-icons/md"

const ProductForm = ({
	showModal,
	handleCloseModal,
	product,
	handleInputChange,
	handleAddOrUpdateProduct,
}) => {
	const [showGallery, setShowGallery] = useState(false)
	const [showImageForm, setShowImageForm] = useState(false)
	const [selectedFile, setSelectedFile] = useState(null)
	const [currentImage, setCurrentImage] = useState(null)
	const [previewUrl, setPreviewUrl] = useState(null)
	const [images, setImages] = useState([])
	const { userId } = useContext(AuthContext)

	const fetchImages = async () => {
		try {
			const response = await api.get("/images")
			setImages(response.data)
		} catch (error) {
			console.error("Failed to fetch images:", error)
		}
	}

	useEffect(() => {
		fetchImages()
	}, [])

	const handleSelectImage = (imageId) => {
		handleInputChange({ target: { name: "imageId", value: imageId } })
		setShowGallery(false)
	}
	const handleShowImageModal = () => {
		setShowImageForm(true)
		setPreviewUrl(null)
	}

	const handleCloseGallery = () => setShowGallery(false)
	const handleCloseImageForm = () => setShowImageForm(false)

	const handleAddOrUpdateImage = async () => {
		try {
			const formData = new FormData()

			if (selectedFile) {
				formData.append("file", selectedFile)
			}

			if (currentImage) {
				Object.keys(currentImage).forEach((key) => {
					if (key !== "url" && key !== "file") {
						formData.append(key, currentImage[key])
					}
				})
			}

			formData.append("userId", userId)

			let response
			if (currentImage?.id) {
				for (let [key, value] of formData.entries()) {
					console.log(key, value, typeof value) // 這會輸出 formData 中的所有欄位和值
				}
				response = await api.put(`/images/${currentImage.id}`, formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				})
				setImages((prev) =>
					prev.map((image) =>
						image.id === currentImage.id ? response.data : image
					)
				)
			} else {
				// console.log({ formData })
				response = await api.post("/images", formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				})
				setImages((prev) => [...prev, response.data])
			}

			handleCloseImageForm()
			setPreviewUrl(null)
			await fetchImages() // 重新獲取最新圖片列表
		} catch (error) {
			console.error("Failed to add or update image:", error)
		}
	}

	const handleFileUpload = (e) => {
		const file = e.target.files[0]
		if (file) {
			setSelectedFile(file)
			// 創建預覽URL
			const previewUrl = URL.createObjectURL(file)
			setCurrentImage((prev) => ({
				...prev,
				url: previewUrl,
				fileName: file.name,
			}))
		}
	}

	const handleFileChange = (e) => {
		handleFileUpload(e)
		const file = e.target.files[0]
		if (file) {
			const url = URL.createObjectURL(file)
			setPreviewUrl(url)
		}
	}

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
							<MdOutlineAddBox
								style={{ width: "55px", height: "55px", color: "gray" }}
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
				handleFileChange={handleFileChange}
				handleAddOrUpdateImage={handleAddOrUpdateImage}
				handleFileUpload={handleFileUpload}
				currentImage={currentImage}
				previewUrl={previewUrl}
			/>
		</>
	)
}

export default ProductForm
