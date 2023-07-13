import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { LocalizationType } from 'src/types/LocalizationType'

export type LabelMarkerOptions = google.maps.MarkerLabel

export type MapProps = {
  center: LocalizationType
  label?: LabelMarkerOptions
}

const Map = ({ center, label }: MapProps) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: ''
  })

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{
        minHeight: '20rem',
        minWidth: '20rem',
        height: '100%',
        width: '100%'
      }}
      center={center}
      zoom={15}
    >
      <Marker position={center} options={{ label }} />
    </GoogleMap>
  ) : (
    <></>
  )
}

export default Map
