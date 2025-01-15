import React from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { Container, Row, Col } from "react-bootstrap"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import L from "leaflet"

const MapComponent = ({ stores }) => {
	const position = [25.033964, 121.564468]

	const customIcon = L.icon({
		iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
		iconSize: [25, 41], // Icon size
		iconAnchor: [12, 41], // Icon anchor
	})

	return (
		<Container>
			<Row className="justify-content-center my-4">
				<Col md={12}>
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
					</MapContainer>
				</Col>
			</Row>
		</Container>
	)
}

export default MapComponent
