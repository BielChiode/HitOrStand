import { useEffect, useState } from 'react'
import getDeck from '../getDeck'

export function useGetDeck() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await getDeck()
        setData(responseData)
      } catch (error) {
        setError('Erro ao tentar buscar deck')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}
