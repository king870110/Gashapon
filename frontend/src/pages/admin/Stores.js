import { useState, useEffect } from "react"
import axios from "axios"

function AdminStores() {
	const [stores, setStores] = useState([])
	const [loading, setLoading] = useState(true)
	const [editingStore, setEditingStore] = useState(null)
	const [formData, setFormData] = useState({
		name: "",
		address: "",
		description: "",
		latitude: "",
		longitude: "",
	})

	useEffect(() => {
		fetchStores()
	}, [])

	const fetchStores = async () => {
		try {
			const response = await axios.get("/api/admin/stores")
			setStores(response.data)
			setLoading(false)
		} catch (error) {
			console.error("Error fetching stores:", error)
			setLoading(false)
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			if (editingStore) {
				await axios.put(`/api/admin/stores/${editingStore.id}`, formData)
			} else {
				await axios.post("/api/admin/stores", formData)
			}
			fetchStores()
			setEditingStore(null)
			setFormData({
				name: "",
				address: "",
				description: "",
				latitude: "",
				longitude: "",
			})
		} catch (error) {
			console.error("Error saving store:", error)
		}
	}

	const handleEdit = (store) => {
		setEditingStore(store)
		setFormData({
			name: store.name,
			address: store.address,
			description: store.description || "",
			latitude: store.latitude,
			longitude: store.longitude,
		})
	}

	const handleDelete = async (id) => {
		if (!window.confirm("確定要刪除這個商店嗎？")) return

		try {
			await axios.delete(`/api/admin/stores/${id}`)
			setStores(stores.filter((store) => store.id !== id))
		} catch (error) {
			console.error("Error deleting store:", error)
		}
	}

	if (loading) return <div>Loading...</div>

	return (
		<div>
			<h1 className="text-2xl font-bold text-gray-900 mb-6">商店管理</h1>

			<form
				onSubmit={handleSubmit}
				className="mb-8 bg-white p-6 rounded-lg shadow"
			>
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
					<div>
						<label className="block text-sm font-medium text-gray-700">
							商店名稱
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
							地址
						</label>
						<input
							type="text"
							required
							value={formData.address}
							onChange={(e) =>
								setFormData({ ...formData, address: e.target.value })
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
							緯度
						</label>
						<input
							type="number"
							step="any"
							required
							value={formData.latitude}
							onChange={(e) =>
								setFormData({ ...formData, latitude: e.target.value })
							}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700">
							經度
						</label>
						<input
							type="number"
							step="any"
							required
							value={formData.longitude}
							onChange={(e) =>
								setFormData({ ...formData, longitude: e.target.value })
							}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
						/>
					</div>
				</div>
				<div className="mt-4 flex justify-end">
					<button type="submit" className="btn-primary">
						{editingStore ? "更新商店" : "新增商店"}
					</button>
				</div>
			</form>

			<div className="bg-white shadow overflow-hidden sm:rounded-md">
				<ul className="divide-y divide-gray-200">
					{stores.map((store) => (
						<li key={store.id}>
							<div className="px-4 py-4 sm:px-6">
								<div className="flex items-center justify-between">
									<h3 className="text-lg font-medium text-gray-900">
										{store.name}
									</h3>
									<div className="flex space-x-2">
										<button
											onClick={() => handleEdit(store)}
											className="text-indigo-600 hover:text-indigo-900"
										>
											編輯
										</button>
										<button
											onClick={() => handleDelete(store.id)}
											className="text-red-600 hover:text-red-900"
										>
											刪除
										</button>
									</div>
								</div>
								<div className="mt-2">
									<p className="text-sm text-gray-500">{store.address}</p>
									{store.description && (
										<p className="mt-1 text-sm text-gray-500">
											{store.description}
										</p>
									)}
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default AdminStores
