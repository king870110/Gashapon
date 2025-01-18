import React, { useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import { Container } from "react-bootstrap"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import L from "leaflet"

const MapComponent = ({ stores, selectedStore }) => {
	let position = [25.033964, 121.564468]
	console.log({ selectedStore })
	if (selectedStore && selectedStore.latitude && selectedStore.longitude) {
		position = [selectedStore.latitude, selectedStore.longitude]
		// 用於更新地圖視圖的組件
	}
	const UpdateMapView = ({ center, zoom }) => {
		const map = useMap()
		useEffect(() => {
			map.setView(center, zoom)
		}, [center, zoom, map])
		return null
	}

	const customIcon = L.icon({
		iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
		iconSize: [25, 41], // Icon size
		iconAnchor: [12, 41], // Icon anchor
	})

	return (
		<Container>
			<MapContainer
				center={position}
				zoom={15}
				style={{ width: "100%", height: "60vh" }}
			>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				/>
				{/* Dynamically add markers */}
				{stores &&
					stores.map((store) => (
						<Marker
							key={store.id}
							position={[store.latitude, store.longitude]}
							icon={customIcon}
						>
							<Popup>
								<strong>{store.name}</strong> <br />
								{store.address}
							</Popup>
						</Marker>
					))}
				<UpdateMapView center={position} />
			</MapContainer>
		</Container>
	)
}

export default MapComponent
