import { renderHook, waitFor } from '@testing-library/react-native'
import getCards from '../../getCards'
import { useGetCards } from '../useGetCards'

jest.mock('../../getCards')

describe('useGetCards', () => {
  const respostaEsperada = {
    success: true,
    deck_id: 'kxozasf3edqu',
    cards: [
      {
        code: '6H',
        image: 'https://deckofcardsapi.com/static/img/6H.png',
        images: {
          svg: 'https://deckofcardsapi.com/static/img/6H.svg',
          png: 'https://deckofcardsapi.com/static/img/6H.png'
        },
        value: '6',
        suit: 'HEARTS'
      },
      {
        code: '5S',
        image: 'https://deckofcardsapi.com/static/img/5S.png',
        images: {
          svg: 'https://deckofcardsapi.com/static/img/5S.svg',
          png: 'https://deckofcardsapi.com/static/img/5S.png'
        },
        value: '5',
        suit: 'SPADES'
      }
    ],
    remaining: 50
  }
  it('Deve retornar os dados com sucesso', async () => {
    getCards.mockResolvedValue(respostaEsperada)

    const { result } = renderHook(() => useGetCards())

    waitFor(() => {
      expect(result.current.data).toBe(respostaEsperada)
      expect(result.current.loading).toBe(false)
      expect(result.current.error).toBe(null)
    })
  })
  it('Deve retornar que esta carregando', async () => {
    const { result } = renderHook(() => useGetCards())

    waitFor(() => {
      expect(result.current.data).toBe(null)
      expect(result.current.loading).toBe(true)
      expect(result.current.error).toBe(null)
    })
  })

  it('deve lidar com erros', async () => {
    getCards.mockRejectedValue(new Error('Erro ao tentar buscar cartas'))

    const { result } = renderHook(() => useGetCards())

    waitFor(() => {
      expect(result.current.data).toBe(null)
      expect(result.current.loading).toBe(false)
      expect(result.current.error).toBe('Erro ao tentar buscar cartas')
    })
  })
})
