import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { useEffect, useState } from 'react'
import { useAlert } from 'src/hooks/useAlert'
import { LocalizationType } from 'src/types/LocalizationType'

export type LabelMarkerOptions = google.maps.MarkerLabel

export type MapProps = {
  center?: LocalizationType
  label?: LabelMarkerOptions
}

const Map = ({ center, label }: MapProps) => {
  const { setAlert } = useAlert()

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: ''
  })
  const [position, setPosition] = useState<LocalizationType>({ lat: 0, lng: 0 })

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition(
            center ?? {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          )
        },
        (error) => {
          setAlert({ title: error.message, type: 'error' })
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      )
    } else {
      setAlert({ title: 'Geolocalização não suportada.', type: 'error' })
    }
  }, [center, setAlert])

  return isLoaded ? (
    <div
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      <GoogleMap
        mapContainerStyle={{
          minHeight: '20rem',
          minWidth: '20rem',
          height: '100%',
          width: '100%'
        }}
        center={position}
        zoom={15}
      >
        <Marker position={position} options={{ label }} />
      </GoogleMap>
    </div>
  ) : (
    <></>
  )
}

export default Map
