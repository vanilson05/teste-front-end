import { useId, useState, type CSSProperties, type KeyboardEvent } from 'react'
import type { Product } from '../../types/product'
import ProductCard from '../ProductCard'
import ProductCardSkeleton from '../ProductCardSkeleton'
import arrowIcon from '../../assets/icons/arrow.svg'
import './ProductShelf.scss'

const TABS = ['Celular', 'Acessórios', 'Tablets', 'Notebooks', 'TVs', 'Ver todos']
const VISIBLE_CARDS = 4

interface ProductShelfProps {
  title: string
  products: Product[]
  isLoading: boolean
  error: string | null
  showTabs?: boolean
}

function ProductShelf({ title, products, isLoading, error, showTabs = false }: ProductShelfProps) {
  const id = useId()
  const [activeTab, setActiveTab] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)

  const maxIndex = Math.max(0, products.length - VISIBLE_CARDS)
  const canNavigate = !isLoading && !error && products.length > VISIBLE_CARDS

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
        <ul className="product-shelf__track" aria-busy="true" aria-label="Carregando produtos">
          {Array.from({ length: VISIBLE_CARDS }, (_, index) => (
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
      <ul
        className="product-shelf__track"
        style={{ '--index': currentIndex } as CSSProperties}
      >
        {products.map((product, index) => {
          const isVisible = index >= currentIndex && index < currentIndex + VISIBLE_CARDS

          return (
            <li
              key={product.productName}
              className={`product-shelf__item${isVisible ? '' : ' product-shelf__item--hidden'}`}
              inert={!isVisible}
            >
              <ProductCard product={product} />
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
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((index) => Math.max(0, index - 1))}
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
            disabled={currentIndex === maxIndex}
            onClick={() => setCurrentIndex((index) => Math.min(maxIndex, index + 1))}
          >
            <img src={arrowIcon} alt="" width={40} height={40} />
          </button>
        )}
      </div>
    </section>
  )
}

export default ProductShelf
