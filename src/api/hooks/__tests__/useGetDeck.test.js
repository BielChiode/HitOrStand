import { renderHook, waitFor } from '@testing-library/react-native'
import getDeck from '../../getDeck'
import { useGetDeck } from '../useGetDeck'

jest.mock('../../getDeck')

describe('useGetDeck', () => {
  const respostaEsperada = {
    success: true,
    deck_id: '3p40paa87x90',
    shuffled: false,
    remaining: 52
  }
  it('Deve retornar os dados com sucesso', async () => {
    getDeck.mockResolvedValue(respostaEsperada)

    const { result } = renderHook(() => useGetDeck())

    waitFor(() => {
      expect(result.current.data).toEqual(respostaEsperada)
      expect(result.current.loading).toBe(false)
      expect(result.current.error).toBe(null)
    })
  })
  it('Deve retornar que esta carregando', async () => {
    const { result } = renderHook(() => useGetDeck())

    waitFor(() => {
      expect(result.current.data).toEqual(null)
      expect(result.current.loading).toBe(true)
      expect(result.current.error).toBe(null)
    })
  })

  it('deve lidar com erros', async () => {
    getDeck.mockRejectedValue(new Error('Erro ao tentar buscar deck'))

    const { result } = renderHook(() => useGetDeck())

    waitFor(() => {
      expect(result.current.data).toBe(null)
      expect(result.current.loading).toBe(false)
      expect(result.current.error).toBe('Erro ao tentar buscar deck')
    })
  })
})
