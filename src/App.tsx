import { useState } from 'react'
import Header from './components/Header'
import HeroBanner from './components/HeroBanner'
import CategoryList from './components/CategoryList'
import ProductShelf from './components/ProductShelf'
import ProductModal from './components/ProductModal'
import { useProducts } from './hooks/useProducts'
import type { Product } from './types/product'

function App() {
  const { products, isLoading, error } = useProducts()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const shelfProps = {
    products,
    isLoading,
    error,
    onSelectProduct: setSelectedProduct,
  }

  return (
    <>
      <Header />
      <main>
        <HeroBanner />
        <CategoryList />
        <ProductShelf title="Produtos relacionados" showTabs {...shelfProps} />
        <ProductShelf title="Produtos relacionados" {...shelfProps} />
        <ProductShelf title="Produtos relacionados" {...shelfProps} />
      </main>

      {selectedProduct && (
        <ProductModal
          key={selectedProduct.productName}
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  )
}

export default App
