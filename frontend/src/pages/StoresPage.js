import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"

function StoresPage() {
	const [stores, setStores] = useState([])
	const [loading, setLoading] = useState(true)
	const [selectedStore, setSelectedStore] = useState(null)

	const mapContainerStyle = {
		width: "100%",
		height: "600px",
	}

	const center = {
		lat: 25.033, // 台北市中心
		lng: 121.5654,
	}

	useEffect(() => {
		const fetchStores = async () => {
			try {
				const response = await axios.get("/api/frontend/stores/map")
				setStores(response.data)
				setLoading(false)
			} catch (error) {
				console.error("Error fetching stores:", error)
				setLoading(false)
			}
		}

		fetchStores()
	}, [])

	if (loading) return <div>Loading...</div>

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* 商店列表 */}
				<div className="lg:col-span-1 space-y-4">
					<h2 className="text-2xl font-bold text-gray-900">商店列表</h2>
					<div className="overflow-y-auto h-[600px] space-y-4 pr-4">
						{stores.map((store) => (
							<div
								key={store.id}
								className={`bg-white rounded-lg shadow p-4 cursor-pointer transition-colors ${
									selectedStore?.id === store.id
										? "ring-2 ring-indigo-500"
										: "hover:bg-gray-50"
								}`}
								onClick={() => setSelectedStore(store)}
							>
								<h3 className="text-lg font-medium text-gray-900">
									{store.name}
								</h3>
								<p className="mt-1 text-sm text-gray-500">{store.address}</p>
								<div className="mt-4 flex justify-between items-center">
									<span className="text-sm text-gray-500">
										商品數量: {store.products?.length || 0}
									</span>
									<Link
										to={`/stores/${store.id}`}
										className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
									>
										查看詳情 →
									</Link>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* 地圖 */}
				<div className="lg:col-span-2">
					<LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY}>
						<GoogleMap
							mapContainerStyle={mapContainerStyle}
							center={center}
							zoom={13}
						>
							{stores.map((store) => (
								<Marker
									key={store.id}
									position={{
										lat: store.latitude,
										lng: store.longitude,
									}}
									onClick={() => setSelectedStore(store)}
								/>
							))}
						</GoogleMap>
					</LoadScript>
				</div>
			</div>
		</div>
	)
}

export default StoresPage
