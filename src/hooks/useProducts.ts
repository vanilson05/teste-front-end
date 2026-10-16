import { useEffect, useState } from 'react'
import { getProducts, isAbortError } from '../services/productService'
import type { Product } from '../types/product'

interface UseProductsResult {
  products: Product[]
  isLoading: boolean
  error: string | null
}

export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    getProducts(controller.signal)
      .then((data) => {
        setProducts(data)
        setError(null)
      })
      .catch((err: unknown) => {
        if (isAbortError(err)) return
        setError('Não foi possível carregar os produtos. Tente novamente mais tarde.')
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false)
      })

    return () => controller.abort()
  }, [])

  return { products, isLoading, error }
}
