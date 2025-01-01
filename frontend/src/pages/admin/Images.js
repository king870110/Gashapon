import { useState, useEffect } from "react"
import axios from "axios"

function AdminImages() {
	const [images, setImages] = useState([])
	const [loading, setLoading] = useState(true)
	const [uploadLoading, setUploadLoading] = useState(false)

	useEffect(() => {
		fetchImages()
	}, [])

	const fetchImages = async () => {
		try {
			const response = await axios.get("/api/admin/images")
			setImages(response.data)
			setLoading(false)
		} catch (error) {
			console.error("Error fetching images:", error)
			setLoading(false)
		}
	}

	const handleUpload = async (e) => {
		const files = e.target.files
		if (!files.length) return

		setUploadLoading(true)
		const formData = new FormData()
		for (let i = 0; i < files.length; i++) {
			formData.append("images", files[i])
		}

		try {
			await axios.post("/api/admin/images/upload", formData, {
				headers: { "Content-Type": "multipart/form-data" },
			})
			fetchImages()
		} catch (error) {
			console.error("Error uploading images:", error)
		} finally {
			setUploadLoading(false)
		}
	}

	const handleDelete = async (id) => {
		if (!window.confirm("確定要刪除這張圖片嗎？")) return

		try {
			await axios.delete(`/api/admin/images/${id}`)
			setImages(images.filter((image) => image.id !== id))
		} catch (error) {
			console.error("Error deleting image:", error)
		}
	}

	if (loading) return <div>Loading...</div>

	return (
		<div>
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold text-gray-900">圖片管理</h1>
				<label className="btn-primary cursor-pointer">
					<span>{uploadLoading ? "上傳中..." : "上傳圖片"}</span>
					<input
						type="file"
						multiple
						accept="image/*"
						className="hidden"
						onChange={handleUpload}
						disabled={uploadLoading}
					/>
				</label>
			</div>

			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
				{images.map((image) => (
					<div
						key={image.id}
						className="relative group bg-white rounded-lg shadow overflow-hidden"
					>
						<img
							src={image.url}
							alt={image.filename}
							className="w-full h-48 object-cover"
						/>
						<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center">
							<button
								onClick={() => handleDelete(image.id)}
								className="hidden group-hover:block text-white bg-red-600 px-4 py-2 rounded-md"
							>
								刪除
							</button>
						</div>
						<div className="p-4">
							<p className="text-sm text-gray-500 truncate">{image.filename}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default AdminImages
