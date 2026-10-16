const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

// O JSON não traz preço antigo nem parcelamento, então os dois são derivados do preço atual
const OLD_PRICE_MARKUP = 1.1
const INSTALLMENTS = 2

/** Recebe o valor em centavos e devolve no formato "R$ 1.499,90" */
export function formatPrice(cents: number): string {
  return currencyFormatter.format(cents / 100)
}

export function getOldPrice(cents: number): number {
  return Math.round(cents * OLD_PRICE_MARKUP)
}

export function getInstallmentText(cents: number): string {
  return `ou ${INSTALLMENTS}x de ${formatPrice(cents / INSTALLMENTS)} sem juros`
}
