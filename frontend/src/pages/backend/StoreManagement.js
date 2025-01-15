import React, { useState, useEffect, useContext } from "react"
import { Container, Button } from "react-bootstrap"
import StoreTable from "../../components/StoreTable"
import api from "../../utils/api"
import StoreForm from "../../components/StoreForm"
import { AuthContext } from "../../context/AuthContext"

const StoreManagement = () => {
	const [stores, setStores] = useState([])
	const [showModal, setShowModal] = useState(false)
	const [currentStore, setCurrentStore] = useState(null)
	const { userId } = useContext(AuthContext)

	useEffect(() => {
		const fetchStores = async () => {
			try {
				const response = await api.get("/stores")
				setStores(response.data)
			} catch (error) {
				console.error("Failed to fetch stores:", error)
			}
		}

		fetchStores()
	}, [])

	const handleEdit = (id) => {
		const storeToEdit = stores.find((store) => store.id === id)
		setCurrentStore(storeToEdit)
		setShowModal(true)
	}

	const handleDelete = async (id) => {
		try {
			await api.delete(`/stores/${id}`)
			setStores((prev) => prev.filter((store) => store.id !== id))
			console.log(`Store with ID ${id} deleted successfully.`)
		} catch (error) {
			console.error("Failed to delete store:", error)
		}
	}

	const handleClose = (id) => {
		console.log("Close store with ID:", id)
	}

	const handleShowModal = () => {
		setCurrentStore(null)
		setShowModal(true)
	}

	const handleCloseModal = () => setShowModal(false)

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setCurrentStore((prev) => ({ ...prev, [name]: value }))
	}

	const handleAddOrUpdateStore = async () => {
		try {
			if (currentStore.id) {
				const { id, products, comments, userId, ...restData } = currentStore
				const response = await api.put(`/stores/${currentStore.id}`, restData)
				setStores((prev) =>
					prev.map((store) =>
						store.id === currentStore.id ? response.data : store
					)
				)
			} else {
				currentStore.userId = parseInt(userId)
				currentStore.longitude = parseFloat(currentStore.longitude)
				currentStore.latitude = parseFloat(currentStore.latitude)
				const response = await api.post("/stores", currentStore)
				setStores((prev) => [...prev, response.data])
			}
			handleCloseModal()
		} catch (error) {
			console.error("Failed to add or update store:", error)
		}
	}

	return (
		<Container>
			<h1 className="my-4">商店管理</h1>
			<Button variant="primary" className="mb-3" onClick={handleShowModal}>
				新增商店
			</Button>
			<StoreTable
				stores={stores}
				onEdit={handleEdit}
				onDelete={handleDelete}
				onClose={handleClose}
			/>

			<StoreForm
				showModal={showModal}
				handleCloseModal={handleCloseModal}
				store={currentStore}
				handleInputChange={handleInputChange}
				handleAddOrUpdateStore={handleAddOrUpdateStore}
			/>
		</Container>
	)
}

export default StoreManagement
