import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Navbar from "../components/Navbar"
import "../styles/ProductsPage.css"

function ProductsPage() {
	const [products, setProducts] = useState([])
	const [stores, setStores] = useState([])
	const [filters, setFilters] = useState({
		store: "",
		search: "",
	})
	const navigate = useNavigate()

	useEffect(() => {
		fetchProducts()
		fetchStores()
	}, [])

	const fetchProducts = async () => {
		try {
			const response = await axios.get("http://localhost:3000/products")
			setProducts(response.data)
		} catch (error) {
			console.error("Error fetching products:", error)
		}
	}

	const fetchStores = async () => {
		try {
			const response = await axios.get("http://localhost:3000/stores")
			setStores(response.data)
		} catch (error) {
			console.error("Error fetching stores:", error)
		}
	}

	const handleFilterChange = (e) => {
		setFilters({
			...filters,
			[e.target.name]: e.target.value,
		})
	}

	const filteredProducts = products.filter((product) => {
		return (
			(filters.store === "" || product.store.id.toString() === filters.store) &&
			(filters.search === "" ||
				product.name.toLowerCase().includes(filters.search.toLowerCase()))
		)
	})

	return (
		<div className="products-page">
			<Navbar />
			<div className="container mt-4">
				<div className="filters mb-4">
					<div className="row">
						<div className="col-md-4">
							<select
								className="form-select"
								name="store"
								value={filters.store}
								onChange={handleFilterChange}
							>
								<option value="">所有商店</option>
								{stores.map((store) => (
									<option key={store.id} value={store.id}>
										{store.name}
									</option>
								))}
							</select>
						</div>
						<div className="col-md-8">
							<input
								type="text"
								className="form-control"
								placeholder="搜尋商品..."
								name="search"
								value={filters.search}
								onChange={handleFilterChange}
							/>
						</div>
					</div>
				</div>

				<div className="row">
					{filteredProducts.map((product) => (
						<div key={product.id} className="col-md-3 mb-4">
							<div className="card product-card">
								<img
									src={product.imageUrl}
									className="card-img-top"
									alt={product.name}
								/>
								<div className="card-body">
									<h5 className="card-title">{product.name}</h5>
									<p className="card-text">NT$ {product.price}</p>
									<p className="card-text text-muted">
										商店：{product.store.name}
									</p>
									<button
										className="btn btn-primary w-100"
										onClick={() => navigate(`/store/${product.store.id}`)}
									>
										查看商店
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default ProductsPage
