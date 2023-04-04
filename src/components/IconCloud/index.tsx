import { Cloud } from 'react-icon-cloud'

import { useIcons } from './useIcons'

type IconCloudProps = {
  slugs: string[]
}

const IconCloud = ({ slugs }: IconCloudProps) => {
  const icons = useIcons(slugs)

  return (
    <Cloud id="canvas">
      {icons.map((icon, index) => (
        <div key={index}>{icon}</div>
      ))}
    </Cloud>
  )
}

export default IconCloud
