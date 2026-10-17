import type { Product, ProductsResponse } from '../types/product'

// Proxy para o JSON da Econverse (vite.config.ts em dev, netlify.toml em produção)
const PRODUCTS_URL = '/api/produtos'

// Cópia local usada quando o proxy não está disponível ou o servidor está fora do ar
const FALLBACK_URL = `${import.meta.env.BASE_URL}data/produtos.json`

async function requestProducts(url: string, signal?: AbortSignal): Promise<Product[]> {
  const response = await fetch(url, { signal })

  if (!response.ok) {
    throw new Error(`Erro ${response.status} ao buscar produtos`)
  }

  const data: ProductsResponse = await response.json()

  if (!data.success || !Array.isArray(data.products)) {
    throw new Error('Resposta inválida da lista de produtos')
  }

  return data.products
}

export function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError'
}

export async function getProducts(signal?: AbortSignal): Promise<Product[]> {
  try {
    return await requestProducts(PRODUCTS_URL, signal)
  } catch (error) {
    if (isAbortError(error)) throw error
    return requestProducts(FALLBACK_URL, signal)
  }
}
