import { useEffect, useState } from 'react'
import Map from 'src/components/Map'
import { LocalizationType } from 'src/types/LocalizationType'
import Styles from './styles'

type LocalizationProps = {
  initialValue?: LocalizationType
  markerTitle?: string
  markerDescription?: string
  whenClickOnTheMap?: (position: LocalizationType) => void
}

const Localization = ({
  initialValue,
  markerTitle,
  markerDescription,
  whenClickOnTheMap
}: LocalizationProps) => {
  const [mapIsVisible, setMapIsVisible] = useState(false)
  const [localization, setLocalization] = useState<LocalizationType>()

  useEffect(() => {
    setLocalization(initialValue)
  }, [initialValue])

  const localizationClick = () => {
    setMapIsVisible(true)
  }

  return (
    <>
      <Styles.Wrapper>
        <Styles.Label>Localização</Styles.Label>
        <Styles.Localization
          tabIndex={0}
          id="localization"
          onClick={localizationClick}
        >
          {localization ? (
            <>
              <span>{localization.lat}</span>
              <span>{localization.lng}</span>
            </>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.929 16.3785C3.119 16.9215 2 17.6715 2 18.5C2 20.157 6.477 21.5 12 21.5C17.523 21.5 22 20.157 22 18.5C22 17.6715 20.8805 16.9215 19.071 16.3785"
                stroke="#E5E7EB"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 17.5C12 17.5 18.5 13.252 18.5 8.341C18.5 4.839 15.59 2 12 2C8.41 2 5.5 4.839 5.5 8.341C5.5 13.252 12 17.5 12 17.5Z"
                stroke="#E5E7EB"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M12 11C12.663 11 13.2989 10.7366 13.7678 10.2678C14.2366 9.79893 14.5 9.16304 14.5 8.5C14.5 7.83696 14.2366 7.20107 13.7678 6.73223C13.2989 6.26339 12.663 6 12 6C11.337 6 10.7011 6.26339 10.2322 6.73223C9.76339 7.20107 9.5 7.83696 9.5 8.5C9.5 9.16304 9.76339 9.79893 10.2322 10.2678C10.7011 10.7366 11.337 11 12 11Z"
                stroke="#E5E7EB"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </Styles.Localization>
      </Styles.Wrapper>
      {mapIsVisible && (
        <Styles.Overlay
          onClick={(e: MouseEvent) => {
            e.preventDefault()
            setMapIsVisible(false)
          }}
        >
          <Styles.MapWrapper
            onClick={(e: MouseEvent) => {
              e.stopPropagation()
            }}
          >
            <Map
              center={localization}
              markerTitle={markerTitle}
              markerDescription={markerDescription}
              whenClickOnTheMap={whenClickOnTheMap}
              showSearchBar
            />
          </Styles.MapWrapper>
        </Styles.Overlay>
      )}
    </>
  )
}

export default Localization
