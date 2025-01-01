import { useState, useEffect } from "react"
import axios from "axios"
import {
	Box,
	Heading,
	SimpleGrid,
	Image,
	Text,
	Spinner,
} from "@chakra-ui/react"

function HomePage() {
	const [featured, setFeatured] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchHomeData = async () => {
			try {
				const response = await axios.get("/api/frontend/home")
				setFeatured(response.data.featured)
				setLoading(false)
			} catch (error) {
				console.error("Error fetching home data:", error)
				setLoading(false)
			}
		}

		fetchHomeData()
	}, [])

	if (loading) {
		return <Spinner size="xl" />
	}

	return (
		<Box maxW="7xl" mx="auto" px={4} py={8}>
			{/* Banner Section */}
			<Box h="96" bg="gray.200" rounded="lg" overflow="hidden" mb={8}>
				{/* Banner content */}
			</Box>

			{/* Featured Products */}
			<Heading as="h2" size="lg" mb={6}>
				熱門商品
			</Heading>
			<SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
				{featured.map((product) => (
					<Box
						key={product.id}
						bg="white"
						rounded="lg"
						shadow="md"
						overflow="hidden"
					>
						<Image src={product.imageUrl} alt={product.name} />
						<Box p={4}>
							<Text fontWeight="bold">{product.name}</Text>
							<Text>{product.storeName}</Text>
							<Text fontWeight="bold">${product.price}</Text>
						</Box>
					</Box>
				))}
			</SimpleGrid>
		</Box>
	)
}

export default HomePage
