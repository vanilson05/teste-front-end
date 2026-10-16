import { useId, useState, type CSSProperties, type KeyboardEvent } from 'react'
import type { Product } from '../../types/product'
import ProductCard from '../ProductCard'
import ProductCardSkeleton from '../ProductCardSkeleton'
import { useVisibleCards } from '../../hooks/useVisibleCards'
import arrowIcon from '../../assets/icons/arrow.svg'
import './ProductShelf.scss'

const TABS = ['Celular', 'Acessórios', 'Tablets', 'Notebooks', 'TVs', 'Ver todos']

interface ProductShelfProps {
  title: string
  products: Product[]
  isLoading: boolean
  error: string | null
  showTabs?: boolean
  onSelectProduct: (product: Product) => void
}

function ProductShelf({
  title,
  products,
  isLoading,
  error,
  showTabs = false,
  onSelectProduct,
}: ProductShelfProps) {
  const id = useId()
  const [activeTab, setActiveTab] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const visibleCards = useVisibleCards()

  const maxIndex = Math.max(0, products.length - visibleCards)
  // Ao aumentar a tela, o índice salvo pode passar do limite
  const firstIndex = Math.min(currentIndex, maxIndex)
  const canNavigate = !isLoading && !error && products.length > visibleCards
  const trackStyle = { '--index': firstIndex, '--visible': visibleCards } as CSSProperties

  function selectTab(index: number) {
    setActiveTab(index)
    setCurrentIndex(0)
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key]
    if (!step) return

    const next = (activeTab + step + TABS.length) % TABS.length
    selectTab(next)
    document.getElementById(`${id}-tab-${next}`)?.focus()
  }

  function renderContent() {
    if (error) {
      return (
        <p className="product-shelf__message" role="alert">
          {error}
        </p>
      )
    }

    if (isLoading) {
      return (
        <ul
          className="product-shelf__track"
          style={trackStyle}
          aria-busy="true"
          aria-label="Carregando produtos"
        >
          {Array.from({ length: visibleCards }, (_, index) => (
            <li key={index} className="product-shelf__item">
              <ProductCardSkeleton />
            </li>
          ))}
        </ul>
      )
    }

    if (products.length === 0) {
      return <p className="product-shelf__message">Nenhum produto encontrado.</p>
    }

    return (
      <ul className="product-shelf__track" style={trackStyle}>
        {products.map((product, index) => {
          const isVisible = index >= firstIndex && index < firstIndex + visibleCards

          return (
            <li
              key={product.productName}
              className={`product-shelf__item${isVisible ? '' : ' product-shelf__item--hidden'}`}
              inert={!isVisible}
            >
              <ProductCard product={product} onSelect={onSelectProduct} />
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <section className="product-shelf" aria-labelledby={`${id}-title`}>
      <header className="product-shelf__header">
        <h2 id={`${id}-title`} className="product-shelf__title">
          {title}
        </h2>

        {showTabs ? (
          <div
            className="product-shelf__tabs"
            role="tablist"
            aria-label="Categorias de produtos"
            onKeyDown={handleTabKeyDown}
          >
            {TABS.map((tab, index) => {
              const isActive = index === activeTab

              return (
                <button
                  key={tab}
                  id={`${id}-tab-${index}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`${id}-panel`}
                  tabIndex={isActive ? 0 : -1}
                  className={`product-shelf__tab${isActive ? ' product-shelf__tab--active' : ''}`}
                  onClick={() => selectTab(index)}
                >
                  {tab}
                </button>
              )
            })}
          </div>
        ) : (
          <a href="#" className="product-shelf__see-all">
            Ver todos
          </a>
        )}
      </header>

      <div className="product-shelf__body">
        {canNavigate && (
          <button
            type="button"
            className="product-shelf__arrow product-shelf__arrow--prev"
            aria-label="Produtos anteriores"
            aria-controls={`${id}-panel`}
            disabled={firstIndex === 0}
            onClick={() => setCurrentIndex(Math.max(0, firstIndex - 1))}
          >
            <img src={arrowIcon} alt="" width={40} height={40} />
          </button>
        )}

        <div
          id={`${id}-panel`}
          className="product-shelf__viewport"
          {...(showTabs && { role: 'tabpanel', 'aria-labelledby': `${id}-tab-${activeTab}` })}
        >
          {renderContent()}
        </div>

        {canNavigate && (
          <button
            type="button"
            className="product-shelf__arrow product-shelf__arrow--next"
            aria-label="Próximos produtos"
            aria-controls={`${id}-panel`}
            disabled={firstIndex === maxIndex}
            onClick={() => setCurrentIndex(Math.min(maxIndex, firstIndex + 1))}
          >
            <img src={arrowIcon} alt="" width={40} height={40} />
          </button>
        )}
      </div>
    </section>
  )
}

export default ProductShelf
