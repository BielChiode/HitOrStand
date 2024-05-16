import config from '../../../config.json'
import getDeck from '../getDeck'

describe('getDeck', () => {
  it('deve retornar com sucesso', async () => {
    const respostaEsperada = {
      success: true,
      deck_id: '3p40paa87x90',
      shuffled: false,
      remaining: 52
    }
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => respostaEsperada
    })

    const cards = await getDeck()

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(
        `${config.URL_API_DECK}/new/shuffle/?deck_count=1`
      ),
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          'Content-Type': 'application/json'
        })
      })
    )
    expect(cards).toEqual(respostaEsperada)
  })

  it('deve lidar com erros ao buscar', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false
    })

    await expect(getDeck()).rejects.toThrow('Erro ao tentar buscar deck')
  })
})
