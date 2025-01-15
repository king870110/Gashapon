import React, { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import Map from "../../components/Map"
import axios from "axios"

const Store = () => {
	const [stores, setStores] = useState([]) // 初始化為空陣列
	const [error, setError] = useState(null)

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

	return (
		<Container>
			<h1 className="my-4">商店地圖</h1>
			<Map stores={stores} />
		</Container>
	)
}

export default Store
