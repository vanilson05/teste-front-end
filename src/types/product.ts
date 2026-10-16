export interface Product {
  productName: string
  descriptionShort: string
  photo: string
  /** Valor em centavos (ex.: 149990 = R$ 1.499,90) */
  price: number
}

export interface ProductsResponse {
  success: boolean
  products: Product[]
}
