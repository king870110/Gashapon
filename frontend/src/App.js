import React from "react"
import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ProductsPage from "./pages/ProductsPage"
import LoginPage from "./pages/LoginPage"
import StoreManagePage from "./pages/StoreManagePage"
import StoreDetailPage from "./pages/StoreDetailPage"

function App() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/products" element={<ProductsPage />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/store/manage" element={<StoreManagePage />} />
			<Route path="/store/:id" element={<StoreDetailPage />} />
		</Routes>
	)
}

export default App
