import {
	// BrowserRouter as Router,
	Routes,
	Route,
	Outlet,
	Navigate,
} from "react-router-dom"
import "./styles/global.css"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import StoreDetailPage from "./pages/StoreDetailPage"
import ProductsPage from "./pages/ProductsPage"
import StoresPage from "./pages/StoresPage"
import FAQPage from "./pages/FAQPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import AdminLayout from "./layouts/AdminLayout"
import AdminImages from "./pages/admin/Images"
import AdminStores from "./pages/admin/Stores"
import AdminProducts from "./pages/admin/Products"
import AdminUsers from "./pages/admin/Users"

function App() {
	// 檢查用戶是否已登入
	const isAuthenticated = () => {
		return !!localStorage.getItem("token")
	}

	// 檢查用戶是否為管理員
	const isAdmin = () => {
		const user = JSON.parse(localStorage.getItem("user") || "{}")
		return user.role === "ADMIN"
	}

	// 保護路由的高階組件
	const ProtectedRoute = ({ children, requireAdmin = false }) => {
		if (!isAuthenticated()) {
			return <Navigate to="/login" replace />
		}

		if (requireAdmin && !isAdmin()) {
			return <Navigate to="/" replace />
		}

		return children
	}

	return (
		// <Router>
		<Routes>
			{/* 公開路由 */}
			<Route
				path="/"
				element={
					<div className="min-h-screen bg-gray-50">
						<Navbar />
						<Outlet />
					</div>
				}
			>
				<Route index element={<HomePage />} />
				<Route path="stores" element={<StoresPage />} />
				<Route path="stores/:id" element={<StoreDetailPage />} />
				<Route path="products" element={<ProductsPage />} />
				<Route path="faq" element={<FAQPage />} />
				<Route path="login" element={<LoginPage />} />
				<Route path="register" element={<RegisterPage />} />
			</Route>

			{/* 後台管理路由 */}
			<Route
				path="/admin"
				element={
					<ProtectedRoute requireAdmin>
						<AdminLayout />
					</ProtectedRoute>
				}
			>
				<Route path="images" element={<AdminImages />} />
				<Route path="stores" element={<AdminStores />} />
				<Route path="products" element={<AdminProducts />} />
				<Route path="users" element={<AdminUsers />} />
			</Route>
		</Routes>
		// </Router>
	)
}

export default App
