export default async function getDeck() {
  const url = `${process.env.REACT_APP_URL_API_DECK}/new/shuffle/?deck_count=1`
  console.log(url) // Isso deve imprimir a URL corretamente

  const init = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  alert(url)
  const response = await fetch(url, init)
  console.log(response)
  const responseData = await response.json()
  if (!response.ok) {
    throw new Error(`Erro: ${responseData.mensagem}`)
  }
  return responseData
}
