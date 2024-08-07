import React from 'react'
import '@testing-library/jest-dom'
import 'jest-styled-components'
import {beforeAll} from 'vitest'

beforeAll(() => {
  global.React = React
})
