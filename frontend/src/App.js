import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import FrontendLayout from "./layouts/FrontendLayout"
import BackendLayout from "./layouts/BackendLayout"
import Home from "./pages/frontend/Home"
import Shop from "./pages/frontend/Store"
import Product from "./pages/frontend/Product"
import Notices from "./pages/frontend/Notices"
import StoreManagement from "./pages/backend/StoreManagement"
import ProductManagement from "./pages/backend/ProductManagement"
import ImageManagement from "./pages/backend/ImageManagement"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"

const App = () => {
	return (
		<AuthProvider>
			<Router>
				<Routes>
					<Route
						path="/"
						element={
							<FrontendLayout>
								<Home />
							</FrontendLayout>
						}
					/>
					<Route
						path="/shop"
						element={
							<FrontendLayout>
								<Shop />
							</FrontendLayout>
						}
					/>
					<Route
						path="/product"
						element={
							<FrontendLayout>
								<Product />
							</FrontendLayout>
						}
					/>
					<Route
						path="/notices"
						element={
							<FrontendLayout>
								<Notices />
							</FrontendLayout>
						}
					/>
					<Route
						path="/login"
						element={
							<FrontendLayout>
								<Login />
							</FrontendLayout>
						}
					/>
					<Route
						path="/register"
						element={
							<FrontendLayout>
								<Register />
							</FrontendLayout>
						}
					/>
					<Route
						path="/admin/store-management"
						element={
							<BackendLayout>
								<StoreManagement />
							</BackendLayout>
						}
					/>
					<Route
						path="/admin/product-management"
						element={
							<BackendLayout>
								<ProductManagement />
							</BackendLayout>
						}
					/>
					<Route
						path="/admin/image-management"
						element={
							<BackendLayout>
								<ImageManagement />
							</BackendLayout>
						}
					/>
				</Routes>
			</Router>
		</AuthProvider>
	)
}

export default App
