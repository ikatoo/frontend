import styled, { css } from 'styled-components'

type breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl'
const breakpoint = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
}

export type MediaMatchProps = {
  $lessThan?: breakpoint
  $greaterThan?: breakpoint
}

const mediaMatchModifiers = {
  lessThan: (size: breakpoint) => css`
    ${`@media (max-width: ${breakpoint[size]}) { display: block }`}
  `,

  greaterThan: (size: breakpoint) => css`
    ${`@media (min-width: ${breakpoint[size]}) { display: block }`}
  `
}

export default styled.div<MediaMatchProps>`
  ${({ $lessThan, $greaterThan }) => css`
    display: none;

    ${!!$lessThan && mediaMatchModifiers.lessThan($lessThan)}
    ${!!$greaterThan && mediaMatchModifiers.greaterThan($greaterThan)}
  `}
`
