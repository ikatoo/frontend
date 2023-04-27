import { useEffect, useState } from 'react'

import CloseButton from '../CloseButton'
import ProgressBar from '../ProgressBar'
import Styles from './styles'
import { useAlert } from 'src/hooks/useAlert'

const Alert = () => {
  const alert = useAlert()

  const colors = {
    alert: 'bg-yellow-500 text-slate-700',
    message: 'bg-mck_aqua text-slate-900',
    error: 'bg-mck_red text-slate-200'
  }
  const [isClosed, setIsClosed] = useState(true)

  useEffect(() => {
    if ((alert.title ?? '') === '') {
      setIsClosed(true)
    } else {
      setIsClosed(false)
    }
  }, [alert.title])

  useEffect(() => {
    const autoCloser = async () => {
      alert.autoClose &&
        setTimeout(() => {
          alert.setAlert({
            autoClose: 5000
          })
          setIsClosed(true)
        }, alert.autoClose)
    }
    if (!isClosed && !!alert.title) {
      autoCloser()
    }
  }, [alert, alert.autoClose, alert.title, isClosed])

  const close = () => {
    alert.setAlert({
      autoClose: 5000
    })
    setIsClosed(true)
  }

  const color = alert.type ? colors[alert.type] : null

  return (
    <Styles.Main $isClosed={isClosed} $color={color} role="alert">
      <Styles.Wrapper>
        <Styles.Title>{alert.title}</Styles.Title>
        <Styles.Button onClick={close} $isClosed={isClosed} $color={color}>
          <CloseButton />
        </Styles.Button>
      </Styles.Wrapper>
      <ProgressBar timeAnimation={alert.autoClose} percent={100} />
    </Styles.Main>
  )
}

export default Alert
