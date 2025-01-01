import { useState, useEffect } from "react"
import axios from "../../utils/axios"
import Alert from "../../components/Alert"
import Loading from "../../components/Loading"
import ConfirmDialog from "../../components/ConfirmDialog"

function AdminProducts() {
	const [products, setProducts] = useState([])
	const [stores, setStores] = useState([])
	const [loading, setLoading] = useState(true)
	const [editingProduct, setEditingProduct] = useState(null)
	const [formData, setFormData] = useState({
		name: "",
		price: "",
		description: "",
		storeId: "",
		imageId: "",
	})
	const [error, setError] = useState("")
	const [success, setSuccess] = useState("")
	const [confirmDialog, setConfirmDialog] = useState({
		isOpen: false,
		id: null,
	})

	useEffect(() => {
		Promise.all([fetchProducts(), fetchStores()])
	}, [])

	const fetchProducts = async () => {
		try {
			const response = await axios.get("/api/admin/products")
			setProducts(response.data)
			setLoading(false)
		} catch (error) {
			console.error("Error fetching products:", error)
			setLoading(false)
		}
	}

	const fetchStores = async () => {
		try {
			const response = await axios.get("/api/admin/stores")
			setStores(response.data)
		} catch (error) {
			console.error("Error fetching stores:", error)
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			if (editingProduct) {
				await axios.put(`/api/admin/products/${editingProduct.id}`, formData)
			} else {
				await axios.post("/api/admin/products", formData)
			}
			fetchProducts()
			setEditingProduct(null)
			setFormData({
				name: "",
				price: "",
				description: "",
				storeId: "",
				imageId: "",
			})
		} catch (error) {
			console.error("Error saving product:", error)
		}
	}

	const handleEdit = (product) => {
		setEditingProduct(product)
		setFormData({
			name: product.name,
			price: product.price,
			description: product.description || "",
			storeId: product.storeId,
			imageId: product.imageId,
		})
	}

	const handleDelete = (id) => {
		setConfirmDialog({ isOpen: true, id })
	}

	const confirmDelete = async () => {
		try {
			await axios.delete(`/api/admin/products/${confirmDialog.id}`)
			setProducts(products.filter((product) => product.id !== confirmDialog.id))
			setSuccess("商品已成功刪除")
		} catch (error) {
			setError(error.response?.data?.message || "刪除商品時發生錯誤")
		}
		setConfirmDialog({ isOpen: false, id: null })
	}

	if (loading) return <Loading full />

	return (
		<div>
			<h1 className="text-2xl font-bold text-gray-900 mb-6">商品管理</h1>

			<form
				onSubmit={handleSubmit}
				className="mb-8 bg-white p-6 rounded-lg shadow"
			>
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
					<div>
						<label className="block text-sm font-medium text-gray-700">
							商品名稱
						</label>
						<input
							type="text"
							required
							value={formData.name}
							onChange={(e) =>
								setFormData({ ...formData, name: e.target.value })
							}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700">
							價格
						</label>
						<input
							type="number"
							required
							value={formData.price}
							onChange={(e) =>
								setFormData({ ...formData, price: e.target.value })
							}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
						/>
					</div>
					<div className="sm:col-span-2">
						<label className="block text-sm font-medium text-gray-700">
							描述
						</label>
						<textarea
							value={formData.description}
							onChange={(e) =>
								setFormData({ ...formData, description: e.target.value })
							}
							rows={3}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700">
							商店
						</label>
						<select
							required
							value={formData.storeId}
							onChange={(e) =>
								setFormData({ ...formData, storeId: e.target.value })
							}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
						>
							<option value="">選擇商店</option>
							{stores.map((store) => (
								<option key={store.id} value={store.id}>
									{store.name}
								</option>
							))}
						</select>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700">
							圖片ID
						</label>
						<input
							type="text"
							required
							value={formData.imageId}
							onChange={(e) =>
								setFormData({ ...formData, imageId: e.target.value })
							}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
						/>
					</div>
				</div>
				<div className="mt-4 flex justify-end">
					<button type="submit" className="btn-primary">
						{editingProduct ? "更新商品" : "新增商品"}
					</button>
				</div>
			</form>

			<div className="bg-white shadow overflow-hidden sm:rounded-md">
				<ul className="divide-y divide-gray-200">
					{products.map((product) => (
						<li key={product.id}>
							<div className="px-4 py-4 sm:px-6">
								<div className="flex items-center justify-between">
									<div>
										<h3 className="text-lg font-medium text-gray-900">
											{product.name}
										</h3>
										<p className="text-sm text-gray-500">NT$ {product.price}</p>
									</div>
									<div className="flex space-x-2">
										<button
											onClick={() => handleEdit(product)}
											className="text-indigo-600 hover:text-indigo-900"
										>
											編輯
										</button>
										<button
											onClick={() => handleDelete(product.id)}
											className="text-red-600 hover:text-red-900"
										>
											刪除
										</button>
									</div>
								</div>
								<div className="mt-2">
									<p className="text-sm text-gray-500">
										商店：{product.store?.name}
									</p>
									{product.description && (
										<p className="mt-1 text-sm text-gray-500">
											{product.description}
										</p>
									)}
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>

			{error && (
				<Alert message={error} type="error" onClose={() => setError("")} />
			)}
			{success && (
				<Alert
					message={success}
					type="success"
					onClose={() => setSuccess("")}
				/>
			)}

			<ConfirmDialog
				isOpen={confirmDialog.isOpen}
				onClose={() => setConfirmDialog({ isOpen: false, id: null })}
				onConfirm={confirmDelete}
				title="刪除商品"
				message="確定要刪除這個商品嗎？此操作無法復原。"
			/>
		</div>
	)
}

export default AdminProducts
