import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { LocalizationType } from 'src/types/LocalizationType'

export type MapProps = {
  center: LocalizationType
  markerTitle?: string
  markerDescription?: string
}

const Map = ({ center, markerTitle, markerDescription }: MapProps) => (
  <MapContainer
    center={[center.lat, center.lng]}
    zoom={15}
    style={{ height: '100%', width: '100%' }}
  >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker title={markerTitle} position={[center.lat, center.lng]}>
      {!!markerDescription && (
        <div className="rounded-sm bg-mck_gray_light px-2 py-1">
          <Popup>{markerDescription}</Popup>
        </div>
      )}
    </Marker>
  </MapContainer>
)

export default Map
