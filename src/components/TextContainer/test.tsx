import { render, screen } from '@testing-library/react'
import { TextContainer } from '.'

describe('<TextContainer>', () => {
  it('renders with the correct props', () => {
    const title = 'Example Title'
    const content = 'Example Content'

    render(<TextContainer title={title}>{content}</TextContainer>)

    expect(screen.getByLabelText(title)).toBeInTheDocument()
    expect(screen.getByText(content)).toBeInTheDocument()
  })

  it('matches snapshot', () => {
    const title = 'Example Title'
    const content = 'Example Content'

    render(<TextContainer title={title}>{content}</TextContainer>)

    expect(screen).toMatchSnapshot()
  })

  it('applies styles correctly', () => {
    const title = 'Example Title'
    const content = 'Example Content'

    render(<TextContainer title={title}>{content}</TextContainer>)

    const titleElement = screen.getByText(title)
    expect(titleElement).toHaveStyleRule('font-size', 'clamp(1rem,3vw,3rem)')
    expect(titleElement).toHaveStyleRule('line-height', '1')
    expect(titleElement).toHaveClass('ml-4 font-body text-5xl text-mck_aqua')

    const contentElement = screen.getByText(content)
    expect(contentElement).toHaveClass(`
      ml-4
      text-gray-200
      mb-2
      font-body
      font-normal
    `)

    const headerBackground = titleElement.parentElement
    expect(headerBackground).toHaveClass(`
      before:content-['<header>']
      after:content-['</header>']
      ml-4
      mb-4
      flex
      flex-col
    `)

    const bodyBackground = headerBackground?.parentElement
    expect(bodyBackground).toHaveClass(`
      before:content-['<body>']
      after:content-['</body>']
      ml-4
    `)

    const htmlBackground = bodyBackground?.parentElement
    expect(htmlBackground).toHaveClass(`
      font-indie_flower
      text-slate-700
      font-bold
      before:content-['<html>']
      after:content-['</html>']
    `)

    const wrapper = htmlBackground?.parentElement
    expect(wrapper).toHaveClass(`
      flex
      flex-col
    `)
  })
})
