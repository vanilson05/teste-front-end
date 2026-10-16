import './ProductCardSkeleton.scss'

function ProductCardSkeleton() {
  return (
    <div className="product-card-skeleton" aria-hidden="true">
      <span className="product-card-skeleton__block product-card-skeleton__block--image" />
      <span className="product-card-skeleton__block product-card-skeleton__block--name" />
      <span className="product-card-skeleton__block product-card-skeleton__block--short" />
      <span className="product-card-skeleton__block product-card-skeleton__block--price" />
      <span className="product-card-skeleton__block product-card-skeleton__block--short" />
      <span className="product-card-skeleton__block product-card-skeleton__block--button" />
    </div>
  )
}

export default ProductCardSkeleton
