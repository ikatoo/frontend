import { act, renderHook } from '@testing-library/react'
import { describe, vi } from 'vitest'
import iconsMock from './iconsMock'
import { useIcons } from './useIcons'

vi.mock('react-icon-cloud', () => ({
  fetchSimpleIcons: vi.fn(),
  renderSimpleIcon: vi.fn()
}))

describe('useIcons', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('should render icons when icons are fetched', async () => {
    const slugs = iconsMock.request
    const expectedIcons = [
      <svg key="facebook" />,
      <svg key="twitter" />,
      <svg key="instagram" />
    ]

    // // Mockando a resposta da função fetchSimpleIcons
    // fetchSimpleIcons.mockResolvedValueOnce(iconsMock)

    const { result } = renderHook(() => useIcons(slugs))

    // Verifica que não há ícones renderizados enquanto os ícones não são buscados
    expect(result.current).toEqual([])

    act(() => {
      // Verifica que os ícones foram renderizados corretamente
      expect(result.current).toEqual(expectedIcons)

      // Verifica que a função fetchSimpleIcons foi chamada com os parâmetros corretos
      // expect(fetchSimpleIcons).toHaveBeenCalledWith({ slugs })
    })
  })

  // it('should not render icons when there are no slugs', async () => {
  //   const slugs: string[] = []

  //   const { result } = renderHook(() => useIcons(slugs))

  //   // Verifica que não há ícones renderizados quando não há slugs
  //   expect(result.current).toEqual([])

  //   // Verifica que a função fetchSimpleIcons não foi chamada
  //   expect(fetchSimpleIcons).not.toHaveBeenCalled()
  // })

  // it('should render no icons when an error occurs while fetching icons', async () => {
  //   const slugs = ['facebook', 'twitter', 'instagram']

  //   // Mockando a função fetchSimpleIcons para retornar um erro
  //   fetchSimpleIcons.mockRejectedValueOnce(new Error('Error fetching icons'))

  //   const { result, waitForNextUpdate } = renderHook(() => useIcons(slugs))

  //   // Verifica que não há ícones renderizados enquanto os ícones não são buscados
  //   expect(result.current).toEqual([])

  //   // Espera a atualização do hook com erro
  //   await waitForNextUpdate()

  //   // Verifica que não há ícones renderizados após o erro
  //   expect(result.current).toEqual([])

  //   // Verifica que a função fetchSimpleIcons foi chamada com os parâmetros corretos
  //   expect(fetchSimpleIcons).toHaveBeenCalledWith({ slugs })
  // })
})
