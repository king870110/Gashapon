import { useState, useEffect } from "react"
import axios from "axios"

function AdminUsers() {
	const [users, setUsers] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetchUsers()
	}, [])

	const fetchUsers = async () => {
		try {
			const response = await axios.get("/api/admin/users")
			setUsers(response.data)
			setLoading(false)
		} catch (error) {
			console.error("Error fetching users:", error)
			setLoading(false)
		}
	}

	const handleToggleActive = async (user) => {
		try {
			await axios.patch(`/api/admin/users/${user.id}/toggle-active`)
			setUsers(
				users.map((u) =>
					u.id === user.id ? { ...u, is_active: !u.is_active } : u
				)
			)
		} catch (error) {
			console.error("Error toggling user active status:", error)
		}
	}

	const handleDelete = async (id) => {
		if (!window.confirm("確定要刪除這個使用者嗎？")) return

		try {
			await axios.delete(`/api/admin/users/${id}`)
			setUsers(users.filter((user) => user.id !== id))
		} catch (error) {
			console.error("Error deleting user:", error)
		}
	}

	if (loading) return <div>Loading...</div>

	return (
		<div>
			<h1 className="text-2xl font-bold text-gray-900 mb-6">使用者管理</h1>

			<div className="bg-white shadow overflow-hidden sm:rounded-lg">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								名稱
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								電子郵件
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								角色
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								狀態
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								操作
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{users.map((user) => (
							<tr key={user.id}>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="text-sm font-medium text-gray-900">
										{user.name}
									</div>
									<div className="text-sm text-gray-500">{user.full_name}</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="text-sm text-gray-900">{user.email}</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<span
										className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
											user.role === "ADMIN"
												? "bg-red-100 text-red-800"
												: user.role === "MERCHANT"
												? "bg-green-100 text-green-800"
												: "bg-gray-100 text-gray-800"
										}`}
									>
										{user.role}
									</span>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<button
										onClick={() => handleToggleActive(user)}
										className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
											user.is_active
												? "bg-green-100 text-green-800"
												: "bg-red-100 text-red-800"
										}`}
									>
										{user.is_active ? "啟用" : "停用"}
									</button>
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
									<button
										onClick={() => handleDelete(user.id)}
										className="text-red-600 hover:text-red-900"
									>
										刪除
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default AdminUsers
