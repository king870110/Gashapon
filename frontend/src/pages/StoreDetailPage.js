import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import Navbar from "../components/Navbar"
import "../styles/StoreDetailPage.css"

function StoreDetailPage() {
	const { id } = useParams()
	const [store, setStore] = useState(null)
	const [newComment, setNewComment] = useState("")
	const [rating, setRating] = useState(5)
	const user = JSON.parse(localStorage.getItem("user"))
	const token = localStorage.getItem("token")

	useEffect(() => {
		fetchStoreDetails()
	}, [id])

	const fetchStoreDetails = async () => {
		try {
			const response = await axios.get(`http://localhost:3000/stores/${id}`)
			setStore(response.data)
		} catch (error) {
			console.error("Error fetching store details:", error)
		}
	}

	const handleCommentSubmit = async (e) => {
		e.preventDefault()
		if (!user) {
			alert("請先登入後再評論")
			return
		}

		try {
			await axios.post(
				"http://localhost:3000/comments",
				{
					content: newComment,
					rating,
					storeId: parseInt(id),
				},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			)
			setNewComment("")
			setRating(5)
			fetchStoreDetails()
		} catch (error) {
			console.error("Error submitting comment:", error)
		}
	}

	if (!store) {
		return (
			<div>
				<Navbar />
				<div className="container mt-4">載入中...</div>
			</div>
		)
	}

	return (
		<div className="store-detail-page">
			<Navbar />
			<div className="container mt-4">
				<div className="row">
					<div className="col-md-8">
						<div className="card mb-4">
							<div className="card-body">
								<h2 className="card-title">{store.name}</h2>
								<p className="card-text text-muted">{store.address}</p>
								<p className="card-text">{store.description}</p>
							</div>
						</div>

						<h3>商品列表</h3>
						<div className="row">
							{store.products.map((product) => (
								<div key={product.id} className="col-md-4 mb-4">
									<div className="card h-100">
										<img
											src={product.imageUrl}
											className="card-img-top"
											alt={product.name}
										/>
										<div className="card-body">
											<h5 className="card-title">{product.name}</h5>
											<p className="card-text">NT$ {product.price}</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="col-md-4">
						<div className="card">
							<div className="card-body">
								<h3 className="card-title">顧客評論</h3>
								{user && (
									<form onSubmit={handleCommentSubmit} className="mb-4">
										<div className="mb-3">
											<label className="form-label">評分</label>
											<select
												className="form-select"
												value={rating}
												onChange={(e) => setRating(parseInt(e.target.value))}
											>
												<option value="5">5 星</option>
												<option value="4">4 星</option>
												<option value="3">3 星</option>
												<option value="2">2 星</option>
												<option value="1">1 星</option>
											</select>
										</div>
										<div className="mb-3">
											<label className="form-label">評論內容</label>
											<textarea
												className="form-control"
												rows="3"
												value={newComment}
												onChange={(e) => setNewComment(e.target.value)}
												required
											/>
										</div>
										<button type="submit" className="btn btn-primary w-100">
											發表評論
										</button>
									</form>
								)}

								<div className="comments-list">
									{store.comments.map((comment) => (
										<div key={comment.id} className="comment-item mb-3">
											<div className="d-flex justify-content-between">
												<h6>{comment.user.name}</h6>
												<div className="text-warning">
													{"★".repeat(comment.rating)}
													{"☆".repeat(5 - comment.rating)}
												</div>
											</div>
											<p className="mb-1">{comment.content}</p>
											<small className="text-muted">
												{new Date(comment.createdAt).toLocaleDateString()}
											</small>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default StoreDetailPage
