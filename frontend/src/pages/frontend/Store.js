import React, { useEffect, useState, useRef } from "react"
import { Container, Row, Col } from "react-bootstrap"
import Map from "../../components/Map"
import axios from "axios"
import Filter from "../../components/Filter"
import StoreCard from "../../components/StoreCard"

const Store = () => {
	const [stores, setStores] = useState([]) // 初始化為空陣列
	const [error, setError] = useState(null)
	const [searchTerm, setSearchTerm] = useState("")
	const inputRef = useRef(null)
	const [selectedStore, setSelectedStore] = useState(null) // 追蹤選中的商店

	useEffect(() => {
		const fetchStores = async () => {
			try {
				const response = await axios.get("http://localhost:3000/stores")
				setStores(response.data) // 確保提取 data 屬性
			} catch (err) {
				setError(err.message || "無法加載數據")
				setStores([]) // 確保錯誤時 stores 是空陣列
			}
		}

		fetchStores()
	}, [])

	if (error) {
		return <div>錯誤：{error}</div>
	}

	const filteredStores = stores.filter((store) =>
		store.name.toLowerCase().includes(searchTerm.toLowerCase())
	)

	const handleSubmit = (e) => {
		e.preventDefault() // 阻止表單的默認提交行為
		// const searchTerm = e.target.elements.formSearch.value // 獲取輸入框的值
		const searchTerm = inputRef.current.value
		// 例如：呼叫 API 或過濾資料
		setSearchTerm(searchTerm)
	}
	const handleClear = () => {
		if (inputRef.current) {
			inputRef.current.value = "" // 清空輸入框的值
		}
	}
	const handleStoreClick = (store) => {
		// console.log({ store })
		setSelectedStore(store) // 更新選中的商店
	}

	return (
		<Container>
			<h1 className="my-4">商店地圖</h1>
			<Row>
				<Col className="mb-8">
					<Filter
						inputRef={inputRef}
						handleSubmit={handleSubmit}
						handleClear={handleClear}
					></Filter>
					<br></br>
					{filteredStores.map((store) => (
						<Col key={store.id} className="mb-3 pointer" >
							<StoreCard
								store={store}
								onClick={() => handleStoreClick(store)}
							/>
						</Col>
					))}
				</Col>
				<Col className="mb-4">
					<Map stores={filteredStores} selectedStore={selectedStore} />
				</Col>
			</Row>
		</Container>
	)
}

export default Store
