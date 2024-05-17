import getCards from '../getCards'
import config from '../../../config.json'

describe('getCards', () => {
  it('deve retornar com sucesso', async () => {
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
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => respostaEsperada
    })

    const cards = await getCards('123', 2)

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(`${config.URL_API_DECK}/123/draw/?count=2`),
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          'Content-Type': 'application/json'
        })
      })
    )
    expect(cards).toBe(respostaEsperada)
  })

  it('deve lidar com erros ao buscar', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false
    })

    await expect(getCards('123', 2)).rejects.toThrow(
      'Erro ao tentar buscar cartas'
    )
  })
})
