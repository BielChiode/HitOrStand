import config from '../../config.json'

export default async function getCards(deckId, count) {
  const url = `${config.URL_API_DECK}/${deckId}/draw/?count=${count}`

  const init = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const response = await fetch(url, init)
  if (!response.ok) {
    throw new Error(`Erro ao tentar buscar cartas`)
  }
  const responseData = await response.json()
  return responseData
}
