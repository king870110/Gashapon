import React, { useState, useEffect, useContext } from "react"
import { Container, Button } from "react-bootstrap"
import ProductTable from "../../components/ProductTable"
import api from "../../utils/api"
import ProductForm from "../../components/ProductForm"
import { AuthContext } from "../../context/AuthContext"

const ProductManagement = () => {
	const [products, setProducts] = useState([])
	const [showModal, setShowModal] = useState(false)
	const [currentProduct, setCurrentProduct] = useState(null)
	const { userId } = useContext(AuthContext)

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await api.get("/products")
				setProducts(response.data)
			} catch (error) {
				console.error("Failed to fetch products:", error)
			}
		}

		fetchProducts()
	}, [])

	const handleEdit = (id) => {
		const productToEdit = products.find((product) => product.id === id)
		setCurrentProduct(productToEdit)
		setShowModal(true)
	}

	const handleDelete = async (id) => {
		try {
			await api.delete(`/products/${id}`)
			setProducts((prev) => prev.filter((product) => product.id !== id))
			console.log(`Product with ID ${id} deleted successfully.`)
		} catch (error) {
			console.error("Failed to delete product:", error)
		}
	}

	const onChangeStatus = async (id, isActive) => {
		try {
			console.log({ isActive })
			// console.log(`Product ID: ${id}, New Status: ${isActive}`)
			const response = await api.put(`/products/${id}`, { isActive })
			console.log({ response })
			// 在這裡執行其他邏輯，例如 API 請求來更新狀態
			setProducts((prevProducts) =>
				prevProducts.map((product) =>
					product.id === id ? { ...product, isActive } : product
				)
			)
		} catch (error) {
			console.error(error)
		}
	}

	const handleShowModal = () => {
		setCurrentProduct(null)
		setShowModal(true)
	}

	const handleCloseModal = () => setShowModal(false)

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setCurrentProduct((prev) => ({ ...prev, [name]: value }))
	}

	const handleAddOrUpdateProduct = async () => {
		try {
			console.log({ currentProduct })
			console.log(currentProduct.id)
			currentProduct.userId = parseInt(userId)
			currentProduct.price = parseInt(currentProduct.price) || 0
			currentProduct.imageId = parseInt(currentProduct.imageId) || 0
			currentProduct.storeId = parseInt(currentProduct.storeId) || 0
			currentProduct.categoryId = parseInt(currentProduct.categoryId) || 0
			if (currentProduct.id) {
				const response = await api.put(
					`/products/${currentProduct.id}`,
					currentProduct
				)
				setProducts((prev) =>
					prev.map((product) =>
						product.id === currentProduct.id ? response.data : product
					)
				)
				console.log(response.data)
			} else {
				const response = await api.post("/products/create", currentProduct)
				console.log(response.data)
				setProducts((prev) => [...prev, response.data])
			}
			handleCloseModal()
		} catch (error) {
			console.error("Failed to add or update product:", error)
		}
	}

	return (
		<Container>
			<h1 className="my-4">商品管理</h1>
			<Button variant="primary" className="mb-3" onClick={handleShowModal}>
				新增商品
			</Button>
			<ProductTable
				products={products}
				onEdit={handleEdit}
				onDelete={handleDelete}
				onChangeStatus={onChangeStatus}
			/>

			<ProductForm
				showModal={showModal}
				handleCloseModal={handleCloseModal}
				product={currentProduct}
				handleInputChange={handleInputChange}
				handleAddOrUpdateProduct={handleAddOrUpdateProduct}
			/>
		</Container>
	)
}

export default ProductManagement
