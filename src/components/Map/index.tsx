import 'leaflet/dist/leaflet.css'
import { useState } from 'react'
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents
} from 'react-leaflet'
import { LocalizationType } from 'src/types/LocalizationType'

export type MapProps = {
  center?: LocalizationType
  markerTitle?: string
  markerDescription?: string
  whenClickOnTheMap?: (position: LocalizationType) => void
}

const Map = ({
  center,
  markerTitle,
  markerDescription,
  whenClickOnTheMap
}: MapProps) => {
  const [position, setPosition] = useState(center)

  const Events = () => {
    useMapEvents({
      click: (event) => {
        setPosition({ lat: event.latlng.lat, lng: event.latlng.lng })

        whenClickOnTheMap && whenClickOnTheMap(event.latlng)
      }
    })
    return <></>
  }

  return (
    <MapContainer
      center={!position ? [0, 0] : [position.lat, position.lng]}
      zoom={15}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {position && (
        <Marker title={markerTitle} position={[position.lat, position.lng]}>
          {!!markerDescription && (
            <div className="rounded-sm bg-mck_gray_light px-2 py-1">
              <Popup>{markerDescription}</Popup>
            </div>
          )}
        </Marker>
      )}
      <Events />
    </MapContainer>
  )
}

export default Map
