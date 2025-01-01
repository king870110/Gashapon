import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"
import { Box, Heading, Flex, Text, Spinner } from "@chakra-ui/react"

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

	if (loading) return <Spinner size="xl" />

	return (
		<Box maxW="7xl" mx="auto" px={4} py={8}>
			<Flex direction={{ base: "column", lg: "row" }} gap={8}>
				{/* 商店列表 */}
				<Box flex="1" overflowY="auto" maxH="600px">
					<Heading as="h2" size="lg" mb={4}>
						商店列表
					</Heading>
					{stores.map((store) => (
						<Box
							key={store.id}
							bg="white"
							rounded="lg"
							shadow="md"
							p={4}
							mb={4}
							cursor="pointer"
							onClick={() => setSelectedStore(store)}
							border={selectedStore?.id === store.id ? "2px" : "none"}
							borderColor="teal.500"
						>
							<Text fontWeight="bold">{store.name}</Text>
							<Text>{store.address}</Text>
							<Flex justify="space-between" align="center" mt={4}>
								<Text>商品數量: {store.products?.length || 0}</Text>
								<Link to={`/stores/${store.id}`} color="teal.500">
									查看詳情 →
								</Link>
							</Flex>
						</Box>
					))}
				</Box>

				{/* 地圖 */}
				<Box flex="2">
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
				</Box>
			</Flex>
		</Box>
	)
}

export default StoresPage
