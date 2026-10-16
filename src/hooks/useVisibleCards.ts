import { useSyncExternalStore } from 'react'

// Largura mínima da tela -> quantidade de cards visíveis na vitrine
const BREAKPOINTS: [minWidth: number, cards: number][] = [
  [1280, 4],
  [1024, 3],
  [640, 2],
]

const queries = BREAKPOINTS.map(([minWidth]) => `(min-width: ${minWidth}px)`)

function getVisibleCards(): number {
  const index = queries.findIndex((query) => window.matchMedia(query).matches)
  return index === -1 ? 1 : BREAKPOINTS[index][1]
}

function subscribe(callback: () => void) {
  const mediaQueries = queries.map((query) => window.matchMedia(query))
  mediaQueries.forEach((mediaQuery) => mediaQuery.addEventListener('change', callback))

  return () => {
    mediaQueries.forEach((mediaQuery) => mediaQuery.removeEventListener('change', callback))
  }
}

export function useVisibleCards(): number {
  return useSyncExternalStore(subscribe, getVisibleCards, () => BREAKPOINTS[0][1])
}
