import { useId, useRef, useState, type MouseEvent } from 'react'
import { createPortal } from 'react-dom'
import type { Product } from '../../types/product'
import { formatPrice } from '../../utils/price'
import { useModalBehavior } from '../../hooks/useModalBehavior'
import minusIcon from '../../assets/icons/minus.svg'
import plusIcon from '../../assets/icons/plus.svg'
import './ProductModal.scss'

const MIN_QUANTITY = 1
const MAX_QUANTITY = 99

interface ProductModalProps {
  product: Product
  onClose: () => void
}

function ProductModal({ product, onClose }: ProductModalProps) {
  const id = useId()
  const dialogRef = useRef<HTMLDivElement>(null)
  const [quantity, setQuantity] = useState(MIN_QUANTITY)

  useModalBehavior(dialogRef, onClose)

  function handleOverlayClick(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) onClose()
  }

  function changeQuantity(step: number) {
    setQuantity((current) => Math.min(MAX_QUANTITY, Math.max(MIN_QUANTITY, current + step)))
  }

  return createPortal(
    <div className="product-modal" onClick={handleOverlayClick}>
      <div
        ref={dialogRef}
        className="product-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-description`}
      >
        <button
          type="button"
          className="product-modal__close"
          aria-label="Fechar"
          onClick={onClose}
        />

        <img
          className="product-modal__image"
          src={product.photo}
          alt={product.productName}
          width={247}
          height={192}
        />

        <div className="product-modal__info">
          <h2 id={`${id}-title`} className="product-modal__title">
            {product.productName}
          </h2>
          <p className="product-modal__price">{formatPrice(product.price)}</p>

          <p id={`${id}-description`} className="product-modal__description">
            {product.descriptionShort}
          </p>
          <a href="#" className="product-modal__details">
            Veja mais detalhes do produto &gt;
          </a>

          <div className="product-modal__actions">
            <div className="product-modal__quantity" role="group" aria-label="Quantidade">
              <button
                type="button"
                aria-label="Diminuir quantidade"
                disabled={quantity === MIN_QUANTITY}
                onClick={() => changeQuantity(-1)}
              >
                <img src={minusIcon} alt="" width={20} height={20} />
              </button>
              <output aria-live="polite">{String(quantity).padStart(2, '0')}</output>
              <button
                type="button"
                aria-label="Aumentar quantidade"
                disabled={quantity === MAX_QUANTITY}
                onClick={() => changeQuantity(1)}
              >
                <img src={plusIcon} alt="" width={20} height={20} />
              </button>
            </div>

            <button type="button" className="product-modal__buy" onClick={onClose}>
              Comprar
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default ProductModal
