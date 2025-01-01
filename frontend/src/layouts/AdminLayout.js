import { useState } from "react"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import { HiMenu, HiX } from "react-icons/hi"

function AdminLayout() {
	const [sidebarOpen, setSidebarOpen] = useState(false)
	const location = useLocation()
	const navigate = useNavigate()

	const navigation = [
		{ name: "圖片管理", href: "/admin/images" },
		{ name: "商店管理", href: "/admin/stores" },
		{ name: "商品管理", href: "/admin/products" },
		{ name: "使用者管理", href: "/admin/users" },
	]

	const handleLogout = () => {
		localStorage.removeItem("token")
		localStorage.removeItem("user")
		navigate("/login")
	}

	return (
		<div className="h-screen flex overflow-hidden bg-gray-100">
			{/* 側邊欄 - 手機版 */}
			<div
				className={`fixed inset-0 flex z-40 md:hidden ${
					sidebarOpen ? "block" : "hidden"
				}`}
			>
				<div className="fixed inset-0 bg-gray-600 bg-opacity-75" />

				<div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
					<div className="absolute top-0 right-0 -mr-12 pt-2">
						<button
							type="button"
							className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
							onClick={() => setSidebarOpen(false)}
						>
							<HiX className="h-6 w-6 text-white" />
						</button>
					</div>

					<div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
						<div className="flex-shrink-0 flex items-center px-4">
							<span className="text-xl font-bold">後台管理</span>
						</div>
						<nav className="mt-5 px-2 space-y-1">
							{navigation.map((item) => (
								<Link
									key={item.name}
									to={item.href}
									className={`${
										location.pathname === item.href
											? "bg-gray-100 text-gray-900"
											: "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
									} group flex items-center px-2 py-2 text-base font-medium rounded-md`}
								>
									{item.name}
								</Link>
							))}
						</nav>
					</div>
				</div>
			</div>

			{/* 側邊欄 - 桌面版 */}
			<div className="hidden md:flex md:flex-shrink-0">
				<div className="flex flex-col w-64">
					<div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
						<div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
							<div className="flex items-center flex-shrink-0 px-4">
								<span className="text-xl font-bold">後台管理</span>
							</div>
							<nav className="mt-5 flex-1 px-2 bg-white space-y-1">
								{navigation.map((item) => (
									<Link
										key={item.name}
										to={item.href}
										className={`${
											location.pathname === item.href
												? "bg-gray-100 text-gray-900"
												: "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
										} group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
									>
										{item.name}
									</Link>
								))}
							</nav>
						</div>
						<div className="flex-shrink-0 flex border-t border-gray-200 p-4">
							<button
								onClick={handleLogout}
								className="flex-shrink-0 w-full group block"
							>
								<div className="flex items-center">
									<div>
										<p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
											登出
										</p>
									</div>
								</div>
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* 主要內容區 */}
			<div className="flex flex-col w-0 flex-1 overflow-hidden">
				<div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
					<button
						type="button"
						className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
						onClick={() => setSidebarOpen(true)}
					>
						<HiMenu className="h-6 w-6" />
					</button>
				</div>

				<main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
					<div className="py-6">
						<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
							<Outlet />
						</div>
					</div>
				</main>
			</div>
		</div>
	)
}

export default AdminLayout
