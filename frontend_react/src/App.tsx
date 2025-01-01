import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import StoresPage from "./pages/StoresPage"
import ProductsPage from "./pages/ProductsPage"
import AdminStoresPage from "./pages/AdminStoresPage"
import AdminProductsPage from "./pages/AdminProductsPage"

const App: React.FC = () => {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/stores" element={<StoresPage />} />
				<Route path="/products" element={<ProductsPage />} />
				<Route path="/admin/stores" element={<AdminStoresPage />} />
				<Route path="/admin/products" element={<AdminProductsPage />} />
			</Routes>
		</Router>
	)
}

export default App
