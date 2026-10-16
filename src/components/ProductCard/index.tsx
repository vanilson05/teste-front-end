import type { Product } from '../../types/product'
import { formatPrice, getInstallmentText, getOldPrice } from '../../utils/price'
import './ProductCard.scss'

interface ProductCardProps {
  product: Product
}

function ProductCard({ product }: ProductCardProps) {
  const { productName, photo, price } = product

  return (
    <article className="product-card">
      <img
        className="product-card__image"
        src={photo}
        alt={productName}
        width={278}
        height={228}
        loading="lazy"
      />

      <h3 className="product-card__name">{productName}</h3>

      <p className="product-card__old-price">
        <span className="visually-hidden">De </span>
        <s>{formatPrice(getOldPrice(price))}</s>
      </p>
      <p className="product-card__price">
        <span className="visually-hidden">Por </span>
        {formatPrice(price)}
      </p>
      <p className="product-card__installments">{getInstallmentText(price)}</p>
      <p className="product-card__shipping">Frete grátis</p>

      <button type="button" className="product-card__button">
        Comprar
      </button>
    </article>
  )
}

export default ProductCard
