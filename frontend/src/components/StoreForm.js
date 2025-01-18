import React, { useState, useEffect } from "react"
import { Modal, Form, Button } from "react-bootstrap"
import L from "leaflet"
import "leaflet-control-geocoder"
import "leaflet/dist/leaflet.css"
import useDebounce from "../utils/debounce"

const StoreForm = ({
	showModal,
	handleCloseModal,
	store,
	handleInputChange,
	handleAddOrUpdateStore,
}) => {
	const [loading, setLoading] = useState(false)
	const [map, setMap] = useState(null)

	// Debounced address change
	const debouncedAddressChange = useDebounce(async (value) => {
		setLoading(true)
		const response = await fetch(
			`https://nominatim.openstreetmap.org/search?format=json&q=${value}`
		)
		const results = await response.json()
		setLoading(false)

		if (results.length > 0) {
			const { lat, lon } = results[0]
			console.log("經緯度:", lat, lon)
			handleInputChange({
				target: { name: "latitude", value: lat },
			})
			handleInputChange({
				target: { name: "longitude", value: lon },
			})

			if (map) {
				map.setView([lat, lon], 13)
				L.marker([lat, lon]).addTo(map)
			}
		} else {
			console.log("無法找到該地址的經緯度")
		}
	}, 1000)

	useEffect(() => {
		if (showModal && store?.address) {
			if (!map) {
				const newMap = L.map("map", {
					center: [0, 0],
					zoom: 13,
					zoomControl: false,
				})

				L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
					newMap
				)
				setMap(newMap)
			}

			const geocoder = L.Control.Geocoder.nominatim()
			geocoder.geocode(store?.address, function (results) {
				if (results.length > 0) {
					const { lat, lng } = results[0].center
					handleInputChange({
						target: { name: "latitude", value: lat },
					})
					handleInputChange({
						target: { name: "longitude", value: lng },
					})

					if (map) {
						map.setView([lat, lng], 13)
						L.marker([lat, lng]).addTo(map)
					}
				}
			})
		}
	}, [showModal, store?.address, map, handleInputChange])

	const handleAddressChange = (e) => {
		const { name, value } = e.target
		handleInputChange(e) // Update the form state immediately with the address input

		if (name === "address" && value) {
			debouncedAddressChange(value) // Trigger the debounced geocoding after a delay
		}
	}

	return (
		<Modal show={showModal} onHide={handleCloseModal}>
			<Modal.Header closeButton>
				<Modal.Title>{store?.id ? "編輯商店" : "新增商店"}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group controlId="formStoreName">
						<Form.Label>商店名稱</Form.Label>
						<Form.Control
							type="text"
							placeholder="輸入商店名稱"
							name="name"
							value={store?.name || ""}
							onChange={handleInputChange}
						/>
					</Form.Group>
					<Form.Group controlId="formStoreAddress" className="mt-3">
						<Form.Label>地址</Form.Label>
						<Form.Control
							type="text"
							placeholder="輸入地址"
							name="address"
							value={store?.address || ""}
							onChange={handleAddressChange} // Immediate input update
						/>
					</Form.Group>
					<Form.Group controlId="formStoreLatitude" className="mt-3">
						<Form.Label>緯度</Form.Label>
						<Form.Control
							type="number"
							placeholder="自動填充"
							name="latitude"
							value={store?.latitude || ""}
							readOnly
						/>
					</Form.Group>
					<Form.Group controlId="formStoreLongitude" className="mt-3">
						<Form.Label>經度</Form.Label>
						<Form.Control
							type="number"
							placeholder="自動填充"
							name="longitude"
							value={store?.longitude || ""}
							readOnly
						/>
					</Form.Group>
					<br></br>
					<div
						id="map"
						style={{ height: "300px", border: "solid 1px #dee2e6" }}
					></div>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleCloseModal}>
					取消
				</Button>
				<Button
					variant="primary"
					onClick={handleAddOrUpdateStore}
					disabled={loading}
				>
					{loading ? "載入中..." : store?.id ? "更新商店" : "新增商店"}
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default StoreForm
