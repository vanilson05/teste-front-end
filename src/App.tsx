import { lazy, Suspense, useState } from 'react'
import Header from './components/Header'
import HeroBanner from './components/HeroBanner'
import CategoryList from './components/CategoryList'
import ProductShelf from './components/ProductShelf'
import PartnerBanners, { type PartnerBanner } from './components/PartnerBanners'
import BrandList from './components/BrandList'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import { useProducts } from './hooks/useProducts'
import type { Product } from './types/product'

// O modal só é baixado quando o usuário abre um produto
const ProductModal = lazy(() => import('./components/ProductModal'))

const firstPartnerBanners: PartnerBanner[] = [
  { title: 'Parceiros', description: 'Ofertas exclusivas das marcas que você ama' },
  { title: 'Parceiros', description: 'Descontos especiais em produtos selecionados' },
]

const secondPartnerBanners: PartnerBanner[] = [
  { title: 'Parceiros', description: 'Novidades das melhores marcas toda semana' },
  { title: 'Parceiros', description: 'Condições únicas para quem compra com a gente' },
]

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
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <HeroBanner />
        <CategoryList />
        <ProductShelf title="Produtos relacionados" showTabs {...shelfProps} />
        <PartnerBanners banners={firstPartnerBanners} />
        <ProductShelf title="Produtos relacionados" {...shelfProps} />
        <PartnerBanners banners={secondPartnerBanners} />
        <BrandList />
        <ProductShelf title="Produtos relacionados" {...shelfProps} />
        <Newsletter />
      </main>
      <Footer />

      {selectedProduct && (
        <Suspense fallback={null}>
          <ProductModal
            key={selectedProduct.productName}
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        </Suspense>
      )}
    </>
  )
}

export default App
