import { useState, useEffect } from "react"
import axios from "axios"

function HomePage() {
	const [featured, setFeatured] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchHomeData = async () => {
			try {
				const response = await axios.get("/api/frontend/home")
				setFeatured(response.data.featured)
				setLoading(false)
			} catch (error) {
				console.error("Error fetching home data:", error)
				setLoading(false)
			}
		}

		fetchHomeData()
	}, [])

	if (loading) {
		return <div>Loading...</div>
	}

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			{/* Banner Section */}
			<div className="relative py-8">
				<div className="h-96 bg-gray-200 rounded-lg overflow-hidden">
					{/* Banner content */}
				</div>
			</div>

			{/* Featured Products */}
			<div className="py-12">
				<h2 className="text-2xl font-bold text-gray-900 mb-6">熱門商品</h2>
				<div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6">
					{featured.map((product) => (
						<div
							key={product.id}
							className="group relative bg-white rounded-lg shadow"
						>
							<div className="aspect-w-1 aspect-h-1 rounded-t-lg overflow-hidden">
								<img
									src={product.imageUrl}
									alt={product.name}
									className="w-full h-full object-center object-cover"
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
					))}
				</div>
			</div>
		</div>
	)
}

export default HomePage
