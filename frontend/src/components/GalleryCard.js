import React, { useState } from "react"
import { Modal, Button } from "react-bootstrap"

const ImageForm = ({
	showModal,
	handleCloseModal,
	image,
	previewUrl,
	handleInputChange,
	handleAddOrUpdateImage,
	handleFileUpload,
	handleFileChange,
}) => {
	const [isPublic, setIsPublic] = useState(image?.isPublic || false)

	const handleCheckboxChange = (e) => {
		setIsPublic(e.target.checked)
		handleInputChange({
			target: { name: "isPublic", value: e.target.checked },
		})
	}

	return (
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
	)
}

export default ImageForm
