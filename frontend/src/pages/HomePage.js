import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Navbar from "../components/Navbar"
import "../styles/HomePage.css"

function HomePage() {
	const [stores, setStores] = useState([])
	const [searchQuery, setSearchQuery] = useState("")
	const navigate = useNavigate()

	useEffect(() => {
		// 獲取商店列表
		fetchStores()
	}, [])

	const fetchStores = async () => {
		try {
			const response = await axios.get("http://localhost:3000/stores")
			setStores(response.data)
		} catch (error) {
			console.error("Error fetching stores:", error)
		}
	}

	const handleSearch = (event) => {
		setSearchQuery(event.target.value)
	}

	const filteredStores = stores.filter(
		(store) =>
			store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			store.address.toLowerCase().includes(searchQuery.toLowerCase())
	)

	return (
		<div className="home-page">
			<Navbar />
			<div className="container-fluid mt-4">
				<div className="row">
					{/* 地圖區域 */}
					<div className="col-md-8">
						<div id="map" className="map-container">
							{/* 這裡將整合 Google Maps */}
						</div>
					</div>

					{/* 側邊欄 */}
					<div className="col-md-4">
						<div className="search-container mb-3">
							<input
								type="text"
								className="form-control"
								placeholder="搜尋商店或地址..."
								value={searchQuery}
								onChange={handleSearch}
							/>
						</div>

						<div className="stores-list">
							{filteredStores.map((store) => (
								<div key={store.id} className="store-card">
									<div className="card mb-3">
										<div className="card-body">
											<h5 className="card-title">{store.name}</h5>
											<p className="card-text text-muted">{store.address}</p>
											<div className="d-flex justify-content-between align-items-center">
												<small className="text-muted">
													商品數量: {store.products?.length || 0}
												</small>
												<button
													className="btn btn-primary btn-sm"
													onClick={() => navigate(`/store/${store.id}`)}
												>
													查看詳情
												</button>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default HomePage
