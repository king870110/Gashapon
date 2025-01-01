import { Link } from "react-router-dom"

function Navbar() {
	return (
		<nav className="bg-white shadow">
			<div className="max-w-7xl mx-auto px-4">
				<div className="flex justify-between h-16">
					<div className="flex">
						<Link to="/" className="flex items-center">
							<span className="text-xl font-bold text-gray-800">扭蛋地圖</span>
						</Link>
						<div className="hidden sm:ml-6 sm:flex sm:space-x-8">
							<Link
								to="/"
								className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
							>
								首頁
							</Link>
							<Link
								to="/stores"
								className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
							>
								商店地圖
							</Link>
							<Link
								to="/products"
								className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
							>
								商品搜尋
							</Link>
							<Link
								to="/faq"
								className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
							>
								常見問題
							</Link>
						</div>
					</div>
					<div className="flex items-center">
						<button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700">
							登入
						</button>
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
