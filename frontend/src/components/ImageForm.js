import React, { useState } from "react"
import { Modal, Form, Button } from "react-bootstrap"

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
		<Modal show={showModal} onHide={handleCloseModal}>
			<Modal.Header closeButton>
				<Modal.Title>{image?.id ? "編輯圖片" : "新增圖片"}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group controlId="formImageFile">
						<Form.Label>上傳圖片</Form.Label>
						<Form.Control type="file" name="file" onChange={handleFileChange} />
					</Form.Group>
					{previewUrl && (
						<div className="mt-3">
							<img
								src={previewUrl}
								alt="Preview"
								style={{ width: "100%", height: "60vh" }}
							/>
						</div>
					)}
					<Form.Group controlId="formImageIsPublic" className="mt-3">
						<Form.Check
							type="checkbox"
							label="是否公開"
							checked={isPublic}
							onChange={handleCheckboxChange}
						/>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleCloseModal}>
					取消
				</Button>
				<Button variant="primary" onClick={handleAddOrUpdateImage}>
					{image?.id ? "更新圖片" : "新增圖片"}
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default ImageForm
