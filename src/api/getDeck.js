import config from '../../config.json'

export default async function getDeck() {
  const url = `${config.URL_API_DECK}/new/shuffle/?deck_count=1`

  const init = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const response = await fetch(url, init)
  if (!response.ok) {
    throw new Error(`Erro ao tentar buscar deck`)
  }
  const responseData = await response.json()
  return responseData
}
