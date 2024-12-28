import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Navbar from "../components/Navbar"
import "../styles/StoreManagePage.css"

function StoreManagePage() {
	const [products, setProducts] = useState([])
	const [newProduct, setNewProduct] = useState({
		name: "",
		price: "",
		imageUrl: "",
		description: "",
	})
	const navigate = useNavigate()
	const user = JSON.parse(localStorage.getItem("user"))
	const token = localStorage.getItem("token")

	useEffect(() => {
		if (!user || user.role !== "STORE_OWNER") {
			navigate("/login")
		} else {
			fetchProducts()
		}
	}, [user, navigate])

	const fetchProducts = async () => {
		try {
			const response = await axios.get(
				`http://localhost:3000/products/store/${user.storeId}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			)
			setProducts(response.data)
		} catch (error) {
			console.error("Error fetching products:", error)
		}
	}

	const handleInputChange = (e) => {
		setNewProduct({
			...newProduct,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			await axios.post(
				"http://localhost:3000/products",
				{
					...newProduct,
					price: parseFloat(newProduct.price),
					storeId: user.storeId,
				},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			)
			fetchProducts()
			setNewProduct({
				name: "",
				price: "",
				imageUrl: "",
				description: "",
			})
		} catch (error) {
			console.error("Error creating product:", error)
		}
	}

	const handleDelete = async (productId) => {
		if (window.confirm("確定要刪除此商品嗎？")) {
			try {
				await axios.delete(`http://localhost:3000/products/${productId}`, {
					headers: { Authorization: `Bearer ${token}` },
				})
				fetchProducts()
			} catch (error) {
				console.error("Error deleting product:", error)
			}
		}
	}

	return (
		<div className="store-manage-page">
			<Navbar />
			<div className="container mt-4">
				<h2>商店管理</h2>
				<div className="row">
					<div className="col-md-4">
						<div className="card">
							<div className="card-body">
								<h3 className="card-title">新增商品</h3>
								<form onSubmit={handleSubmit}>
									<div className="mb-3">
										<label className="form-label">商品名稱</label>
										<input
											type="text"
											className="form-control"
											name="name"
											value={newProduct.name}
											onChange={handleInputChange}
											required
										/>
									</div>
									<div className="mb-3">
										<label className="form-label">價格</label>
										<input
											type="number"
											className="form-control"
											name="price"
											value={newProduct.price}
											onChange={handleInputChange}
											required
										/>
									</div>
									<div className="mb-3">
										<label className="form-label">圖片網址</label>
										<input
											type="url"
											className="form-control"
											name="imageUrl"
											value={newProduct.imageUrl}
											onChange={handleInputChange}
											required
										/>
									</div>
									<div className="mb-3">
										<label className="form-label">描述</label>
										<textarea
											className="form-control"
											name="description"
											value={newProduct.description}
											onChange={handleInputChange}
										/>
									</div>
									<button type="submit" className="btn btn-primary w-100">
										新增商品
									</button>
								</form>
							</div>
						</div>
					</div>
					<div className="col-md-8">
						<div className="card">
							<div className="card-body">
								<h3 className="card-title">商品列表</h3>
								<div className="table-responsive">
									<table className="table">
										<thead>
											<tr>
												<th>商品名稱</th>
												<th>價格</th>
												<th>描述</th>
												<th>操作</th>
											</tr>
										</thead>
										<tbody>
											{products.map((product) => (
												<tr key={product.id}>
													<td>{product.name}</td>
													<td>NT$ {product.price}</td>
													<td>{product.description}</td>
													<td>
														<button
															className="btn btn-danger btn-sm"
															onClick={() => handleDelete(product.id)}
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
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default StoreManagePage
