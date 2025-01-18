import React, { useEffect, useState, useRef } from "react"
import axios from "axios"
import { Container, Row, Col } from "react-bootstrap"
import ProductCard from "../../components/ProductCard" // 假設有一個 ProductCard 組件
import Filter from "../../components/Filter"

const ProductList = () => {
	const [products, setProducts] = useState([]) // 初始化為空陣列
	const [error, setError] = useState(null)
	const [searchTerm, setSearchTerm] = useState("") // 新增狀態來存儲搜尋關鍵字
	const inputRef = useRef(null)

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await axios.get("http://localhost:3000/products")
				setProducts(response.data.filter((ele) => ele.isActive === true)) // 確保提取 data 屬性
			} catch (err) {
				setError(err.message || "無法加載數據")
				setProducts([]) // 確保錯誤時 products 是空陣列
			}
		}

		fetchProducts()
	}, [])

	if (error) {
		return <div>錯誤：{error}</div>
	}

	// 根據搜尋關鍵字篩選商品
	const filteredProducts = products.filter((product) =>
		product.name.toLowerCase().includes(searchTerm.toLowerCase())
	)

	const handleSubmit = (e) => {
		e.preventDefault() // 阻止表單的默認提交行為
		// const searchTerm = e.target.elements.formSearch.value // 獲取輸入框的值
		const searchTerm = inputRef.current.value
		console.log("搜尋關鍵字:", searchTerm) // 在這裡執行搜尋邏輯
		// 例如：呼叫 API 或過濾資料
		setSearchTerm(searchTerm)
	}
	const handleClear = () => {
		if (inputRef.current) {
			inputRef.current.value = "" // 清空輸入框的值
		}
	}

	return (
		<Container>
			<h1 className="my-4">商品列表</h1>
			<Filter
				inputRef={inputRef}
				handleSubmit={handleSubmit}
				handleClear={handleClear}
			></Filter>
			<Row>
				<br></br>
			</Row>
			<Row>
				{filteredProducts.map((product) => (
					<Col key={product.id} md={3} className="mb-3">
						<ProductCard product={product} />
					</Col>
				))}
			</Row>
		</Container>
	)
}

export default ProductList
