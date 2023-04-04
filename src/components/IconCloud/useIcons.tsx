import { useEffect, useState } from 'react'
import { fetchSimpleIcons, renderSimpleIcon } from 'react-icon-cloud'
import type { SimpleIcon } from 'react-icon-cloud'

type FetchSimpleIconsProps = {
  simpleIcons: Record<string, SimpleIcon>
  allIcon: Record<
    string,
    {
      title: string
      hex: string
      slug: string
    }
  >
}
export const useIcons = (slugs: string[]) => {
  const [icons, setIcons] = useState<FetchSimpleIconsProps>()

  useEffect(() => {
    fetchSimpleIcons({ slugs }).then(setIcons)
  }, [slugs])

  if (icons) {
    return Object.values(icons.simpleIcons).map((icon) =>
      renderSimpleIcon({
        icon,
        size: 100,
        aProps: {
          onClick: (e) => e.preventDefault()
        }
      })
    )
  }

  return []
}
