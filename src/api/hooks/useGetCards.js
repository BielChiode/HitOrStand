import { useEffect, useState } from 'react'
import getCards from '../getCards'

export function useGetCards(deckId, count) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!deckId) return
      try {
        const responseData = await getCards(deckId, count)
        setData(responseData)
      } catch (error) {
        setError('Erro ao tentar buscar cartas')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [deckId, count])

  return { data, loading, error }
}
