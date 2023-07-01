import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import UploadInput from '.'

describe('<UploadInput />', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should render the component', () => {
    render(<UploadInput name="test" label="file here" />)
    const component = screen.getByText('file here')

    expect(component).toBeInTheDocument()
  })

  it('should render a disabled component', () => {
    render(<UploadInput disabled name="test" label="file here" />)
    const component =
      screen.getByText('file here').parentElement?.parentElement?.firstChild

    expect(component).toBeDisabled()
  })

  it('should disabled upload button while input file is empty', () => {
    render(<UploadInput name="test" />)

    const uploadButton = screen.getByRole('button')

    expect(uploadButton).toBeDisabled()
  })

  it('should enable upload button when choose a valid image file', async () => {
    render(<UploadInput name="test" label="drop image here" />)

    const uploadButton = screen.getByRole('button')
    const file: DataTransferItem = {
      kind: 'file',
      type: 'image/png',
      getAsFile: vi
        .fn()
        .mockReturnValue(
          new File(['file'], 'image.png', { type: 'image/png' })
        ),
      getAsString: vi.fn(),
      webkitGetAsEntry: vi.fn()
    }

    const dropArea = screen.getByText('drop image here')
      .parentElement as HTMLElement

    fireEvent.drop(dropArea, {
      dataTransfer: {
        items: [file]
      }
    })
    await waitFor(() => {
      expect(uploadButton).not.toBeDisabled()
    })
  })

  it('should update label with name and size of the choosed file and enable upload button', async () => {
    render(<UploadInput name="test" label="drop image here" />)

    const file: DataTransferItem = {
      kind: 'file',
      type: 'image/png',
      getAsFile: vi
        .fn()
        .mockReturnValue(new File(['file'], 'test.png', { type: 'image/png' })),
      getAsString: vi.fn(),
      webkitGetAsEntry: vi.fn()
    }

    const dropArea = screen.getByText('drop image here')
      .parentElement as HTMLElement

    fireEvent.drop(dropArea, {
      dataTransfer: {
        items: [file]
      }
    })

    await waitFor(() => {
      expect(screen.getByText('test.png - 0.000MB')).toBeInTheDocument()
      expect(screen.getByRole('button')).toBeEnabled()
    })
  })

  it('should disable upload button and show default label when cancel choice of the image file', async () => {
    render(<UploadInput name="test" label="drop image here" />)

    const uploadButton = screen.getByRole('button')
    const file: DataTransferItem = {
      kind: 'file',
      type: 'image/png',
      getAsFile: vi
        .fn()
        .mockReturnValue(
          new File(['file'], 'image.png', { type: 'image/png' })
        ),
      getAsString: vi.fn(),
      webkitGetAsEntry: vi.fn()
    }

    const dropArea = screen.getByText('drop image here')
      .parentElement as HTMLElement
    const hiddenInput = dropArea.previousElementSibling as HTMLElement

    fireEvent.drop(dropArea, {
      dataTransfer: {
        items: [file]
      }
    })

    fireEvent.change(hiddenInput, {
      target: {}
    })

    await waitFor(() => {
      expect(uploadButton).toBeDisabled()
      expect(
        screen.getByText('Click or Drop & Down a file here')
      ).toBeInTheDocument()
    })
  })

  it('should call function when change file', async () => {
    const onChangeFileFn = vi.fn()
    render(
      <UploadInput
        name="test"
        label="drop image here"
        onChangeFile={onChangeFileFn}
      />
    )
    expect(onChangeFileFn).toHaveBeenCalledTimes(0)

    const file: DataTransferItem = {
      kind: 'file',
      type: 'image/png',
      getAsFile: vi
        .fn()
        .mockReturnValue(
          new File(['file'], 'image.png', { type: 'image/png' })
        ),
      getAsString: vi.fn(),
      webkitGetAsEntry: vi.fn()
    }

    const dropArea = screen.getByText('drop image here')
      .parentElement as HTMLElement

    fireEvent.drop(dropArea, {
      dataTransfer: {
        items: [file]
      }
    })

    await waitFor(() => {
      expect(onChangeFileFn).toHaveBeenCalledTimes(1)
    })
  })

  it('should call function when press upload button', async () => {
    const onUploadFn = vi.fn()
    render(
      <UploadInput name="test" label="drop image here" uploadFn={onUploadFn} />
    )
    expect(onUploadFn).toHaveBeenCalledTimes(0)

    const uploadButton = screen.getByRole('button')

    const file: DataTransferItem = {
      kind: 'file',
      type: 'image/png',
      getAsFile: vi
        .fn()
        .mockReturnValue(
          new File(['file'], 'image.png', { type: 'image/png' })
        ),
      getAsString: vi.fn(),
      webkitGetAsEntry: vi.fn()
    }

    const dropArea = screen.getByText('drop image here')
      .parentElement as HTMLElement

    fireEvent.drop(dropArea, {
      dataTransfer: {
        items: [file]
      }
    })

    fireEvent.click(uploadButton)

    await waitFor(() => {
      expect(onUploadFn).toHaveBeenCalledTimes(1)
    })
  })

  it('should the label show an error message when the chosen file is not an image', () => {
    render(<UploadInput name="test" label="drop image here" />)

    const file: DataTransferItem = {
      kind: 'file',
      type: 'image/png',
      getAsFile: vi
        .fn()
        .mockReturnValue(
          new File(['file'], 'image.txt', { type: 'text/plain' })
        ),
      getAsString: vi.fn(),
      webkitGetAsEntry: vi.fn()
    }

    const dropArea = screen.getByText('drop image here')
      .parentElement as HTMLElement

    act(() => {
      fireEvent.drop(dropArea, {
        dataTransfer: {
          items: [file]
        }
      })
    })

    expect(screen.getByText('Image only.')).toBeInTheDocument()
    act(() => {
      vi.advanceTimersByTime(5000)
    })
    expect(screen.getByText('drop image here')).toBeInTheDocument()
  })

  it('should not enable upload button when droped file is not valid', () => {
    render(<UploadInput name="test" label="drop image here" />)

    const file: DataTransferItem = {
      kind: 'file',
      type: 'image/png',
      getAsFile: vi
        .fn()
        .mockReturnValue(
          new File(['file'], 'image.txt', { type: 'text/plain' })
        ),
      getAsString: vi.fn(),
      webkitGetAsEntry: vi.fn()
    }

    const dropArea = screen.getByText('drop image here')
      .parentElement as HTMLElement

    act(() => {
      fireEvent.drop(dropArea, {
        dataTransfer: {
          items: [file]
        }
      })
    })
    const uploadButton = screen.getByRole('button')

    expect(uploadButton).toBeDisabled()
  })

  it('should use native input interface when so is linux and navigator is edge', () => {
    navigator.userAgentData = {
      platform: 'Linux',
      brands: [
        {
          brand: 'brand1',
          version: '1'
        },
        {
          brand: 'brand2',
          version: '1'
        },
        {
          brand: 'edge',
          version: '1'
        }
      ]
    }

    render(<UploadInput name="test" label="drop image here" />)
    const dropArea = screen.getByText('drop image here').parentElement
    const input = dropArea?.previousElementSibling

    expect(dropArea).not.toBeVisible()
    expect(input).toBeVisible()
  })

  it.todo('should not change value of the input if file is not a image')
})
