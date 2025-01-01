import { Box, Flex, Link, Button } from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"
import { useTheme } from "next-themes"

function Navbar() {
	const { theme } = useTheme()

	const bgColor = theme === "dark" ? "gray.800" : "white"

	return (
		<Box bg={bgColor} px={4} shadow="md">
			<Flex h={16} alignItems="center" justifyContent="space-between">
				<Flex alignItems="center">
					<Link as={RouterLink} to="/" fontSize="xl" fontWeight="bold">
						扭蛋地圖
					</Link>
					<Flex ml={10} display={{ base: "none", md: "flex" }}>
						<Link as={RouterLink} to="/" px={2} py={1}>
							首頁
						</Link>
						<Link as={RouterLink} to="/stores" px={2} py={1}>
							商店地圖
						</Link>
						<Link as={RouterLink} to="/products" px={2} py={1}>
							商品搜尋
						</Link>
						<Link as={RouterLink} to="/faq" px={2} py={1}>
							常見問題
						</Link>
					</Flex>
				</Flex>
				<Button colorScheme="teal" size="sm">
					登入
				</Button>
			</Flex>
		</Box>
	)
}

export default Navbar
