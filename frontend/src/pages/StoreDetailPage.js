import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

function StoreDetailPage() {
	const { id } = useParams()
	const [store, setStore] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchStoreDetails = async () => {
			try {
				const response = await axios.get(`/api/frontend/stores/${id}`)
				setStore(response.data)
				setLoading(false)
			} catch (error) {
				console.error("Error fetching store details:", error)
				setLoading(false)
			}
		}

		fetchStoreDetails()
	}, [id])

	if (loading) return <div>Loading...</div>
	if (!store) return <div>商店不存在</div>

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			{/* 商店資訊 */}
			<div className="bg-white shadow rounded-lg overflow-hidden">
				<div className="px-6 py-8">
					<h1 className="text-3xl font-bold text-gray-900 mb-4">
						{store.name}
					</h1>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<p className="text-gray-500 mb-4">{store.description}</p>
							<div className="space-y-2">
								<p className="text-sm text-gray-500">
									<span className="font-medium text-gray-900">地址：</span>
									{store.address}
								</p>
								<p className="text-sm text-gray-500">
									<span className="font-medium text-gray-900">商品數量：</span>
									{store.products?.length || 0}
								</p>
							</div>
						</div>
						<div className="h-64 bg-gray-100 rounded-lg">
							{/* 這裡可以放置商店的地圖 */}
						</div>
					</div>
				</div>
			</div>

			{/* 商品列表 */}
			<div className="mt-8">
				<h2 className="text-2xl font-bold text-gray-900 mb-6">商品列表</h2>
				<div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6">
					{store.products?.map((product) => (
						<div
							key={product.id}
							className="group relative bg-white rounded-lg shadow overflow-hidden"
						>
							<div className="aspect-w-1 aspect-h-1">
								<img
									src={product.image.url}
									alt={product.name}
									className="w-full h-full object-center object-cover"
								/>
							</div>
							<div className="p-4">
								<h3 className="text-sm font-medium text-gray-900">
									{product.name}
								</h3>
								<p className="mt-1 text-lg font-medium text-gray-900">
									${product.price}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* 評論區 */}
			<div className="mt-8">
				<h2 className="text-2xl font-bold text-gray-900 mb-6">顧客評論</h2>
				<div className="space-y-6">
					{store.comments?.map((comment) => (
						<div key={comment.id} className="bg-white shadow rounded-lg p-6">
							<div className="flex items-center mb-4">
								<div className="flex-1">
									<h4 className="text-sm font-medium text-gray-900">
										{comment.user.name}
									</h4>
									<div className="flex items-center mt-1">
										{[...Array(5)].map((_, i) => (
											<span
												key={i}
												className={`h-5 w-5 ${
													i < comment.rating
														? "text-yellow-400"
														: "text-gray-300"
												}`}
											>
												★
											</span>
										))}
									</div>
								</div>
								<span className="text-sm text-gray-500">
									{new Date(comment.createdAt).toLocaleDateString()}
								</span>
							</div>
							<p className="text-gray-500">{comment.content}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default StoreDetailPage
