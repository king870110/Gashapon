import React, { useState, useEffect, useContext } from "react"
import { Container, Button, Row, Col, Card } from "react-bootstrap"
// import ImageTable from "../../components/ImageTable"
import api from "../../utils/api"
import ImageForm from "../../components/ImageForm"
import { AuthContext } from "../../context/AuthContext"

const ImageManagement = () => {
	const [images, setImages] = useState([])
	const [showModal, setShowModal] = useState(false)
	const [currentImage, setCurrentImage] = useState(null)
	const [selectedFile, setSelectedFile] = useState(null)
	const [previewUrl, setPreviewUrl] = useState(null)
	const { userId } = useContext(AuthContext)

	useEffect(() => {
		fetchImages()
	}, [])

	const fetchImages = async () => {
		try {
			const response = await api.get("/images")
			setImages(response.data)
		} catch (error) {
			console.error("Failed to fetch images:", error)
		}
	}

	const handleEdit = (id) => {
		const imageToEdit = images.find((image) => image.id === id)
		console.log({ imageToEdit })
		setCurrentImage(imageToEdit)
		setShowModal(true)
	}

	const handleDelete = async (id) => {
		try {
			await api.delete(`/images/${id}`)
			setImages((prev) => prev.filter((image) => image.id !== id))
		} catch (error) {
			console.error("Failed to delete image:", error)
		}
	}

	const handleShowModal = () => {
		setCurrentImage(null)
		setSelectedFile(null)
		setShowModal(true)
	}

	const handleCloseModal = () => {
		setShowModal(false)
		setSelectedFile(null)
		setPreviewUrl(null)
	}

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setCurrentImage((prev) => ({ ...prev, [name]: value }))
	}

	const handleFileChange = (e) => {
		handleFileUpload(e)
		const file = e.target.files[0]
		if (file) {
			const url = URL.createObjectURL(file)
			setPreviewUrl(url)
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

			handleCloseModal()
			await fetchImages() // 重新獲取最新圖片列表
		} catch (error) {
			console.error("Failed to add or update image:", error)
		}
	}

	return (
		<Container>
			<h1 className="my-4">圖庫管理</h1>
			<Button variant="primary" className="mb-3" onClick={handleShowModal}>
				新增圖片
			</Button>

			<Row>
				{images.map((image) => (
					<Col key={image.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
						<Card>
							<Card.Img
								variant="top"
								src={"http://127.0.0.1:3000" + image.url}
								style={{ height: "200px", objectFit: "cover" }}
							/>
							<Card.Body>
								<Card.Title>{image.fileName || "未命名"} </Card.Title>
								<Card.Text>{image.isPublic ? "公開" : "私人"}</Card.Text>
								<div className="d-flex justify-content-between">
									<Button
										variant="outline-primary"
										size="sm"
										onClick={() => handleEdit(image.id)}
									>
										編輯
									</Button>
									<Button
										variant="outline-danger"
										size="sm"
										onClick={() => handleDelete(image.id, userId)}
									>
										刪除
									</Button>
								</div>
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>

			<ImageForm
				showModal={showModal}
				handleCloseModal={handleCloseModal}
				image={currentImage}
				previewUrl={previewUrl}
				handleInputChange={handleInputChange}
				handleAddOrUpdateImage={handleAddOrUpdateImage}
				handleFileUpload={handleFileUpload}
				handleFileChange={handleFileChange}
			/>
		</Container>
	)
}

export default ImageManagement
