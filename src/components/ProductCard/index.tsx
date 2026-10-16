import type { Product } from '../../types/product'
import { formatPrice, getInstallmentText, getOldPrice } from '../../utils/price'
import './ProductCard.scss'

interface ProductCardProps {
  product: Product
  onSelect: (product: Product) => void
}

function ProductCard({ product, onSelect }: ProductCardProps) {
  const { productName, photo, price } = product

  // O card inteiro abre o modal; pelo teclado, o botão Comprar faz o mesmo
  return (
    <article className="product-card" onClick={() => onSelect(product)}>
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
