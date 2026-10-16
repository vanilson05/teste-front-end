import Header from './components/Header'
import HeroBanner from './components/HeroBanner'
import CategoryList from './components/CategoryList'
import ProductShelf from './components/ProductShelf'
import { useProducts } from './hooks/useProducts'

function App() {
  const { products, isLoading, error } = useProducts()
  const shelfData = { products, isLoading, error }

  return (
    <>
      <Header />
      <main>
        <HeroBanner />
        <CategoryList />
        <ProductShelf title="Produtos relacionados" showTabs {...shelfData} />
        <ProductShelf title="Produtos relacionados" {...shelfData} />
        <ProductShelf title="Produtos relacionados" {...shelfData} />
      </main>
    </>
  )
}

export default App
