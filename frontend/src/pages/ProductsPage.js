import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

function ProductsPage() {
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(true)
	const [searchTerm, setSearchTerm] = useState("")

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await axios.get(
					`/api/frontend/products/search?keyword=${searchTerm}`
				)
				setProducts(response.data)
				setLoading(false)
			} catch (error) {
				console.error("Error fetching products:", error)
				setLoading(false)
			}
		}

		const debounce = setTimeout(() => {
			fetchProducts()
		}, 300)

		return () => clearTimeout(debounce)
	}, [searchTerm])

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			{/* 搜尋欄 */}
			<div className="mb-8">
				<input
					type="text"
					placeholder="搜尋商品..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
				/>
			</div>

			{loading ? (
				<div>Loading...</div>
			) : (
				<div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6">
					{products.map((product) => (
						<Link
							key={product.id}
							to={`/stores/${product.storeId}`}
							className="group"
						>
							<div className="relative bg-white rounded-lg shadow overflow-hidden">
								<div className="aspect-w-1 aspect-h-1">
									<img
										src={product.imageUrl}
										alt={product.name}
										className="w-full h-full object-center object-cover group-hover:opacity-75"
									/>
								</div>
								<div className="p-4">
									<h3 className="text-sm font-medium text-gray-900">
										{product.name}
									</h3>
									<p className="mt-1 text-sm text-gray-500">
										{product.storeName}
									</p>
									<p className="mt-1 text-lg font-medium text-gray-900">
										${product.price}
									</p>
								</div>
							</div>
						</Link>
					))}
				</div>
			)}
		</div>
	)
}

export default ProductsPage
