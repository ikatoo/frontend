import { useEffect, useState } from 'react'
import { fetchSimpleIcons, renderSimpleIcon } from 'react-icon-cloud'

export const useIcons = (slugs: string[]) => {
  const [icons, setIcons] = useState<JSX.Element[]>()

  useEffect(() => {
    const getIcons = async () => {
      const icons = await fetchSimpleIcons({ slugs })
      const renderedIcons = Object.values(icons.simpleIcons).map((icon) =>
        renderSimpleIcon({
          icon,
          size: 100,
          aProps: {
            onClick: (e) => e.preventDefault()
          }
        })
      )
      setIcons(renderedIcons ?? [])
    }
    getIcons()
  }, [slugs])

  return { icons }
}
