import shieldIcon from '../../../assets/icons/shield-check.svg'
import truckIcon from '../../../assets/icons/truck.svg'
import cardIcon from '../../../assets/icons/credit-card.svg'
import './TopBar.scss'

interface Benefit {
  icon: string
  highlight: string
  text: string
  highlightFirst: boolean
}

const benefits: Benefit[] = [
  { icon: shieldIcon, highlight: '100% segura', text: 'Compra', highlightFirst: false },
  { icon: truckIcon, highlight: 'Frete grátis', text: 'acima de R$ 200', highlightFirst: true },
  { icon: cardIcon, highlight: 'Parcele', text: 'suas compras', highlightFirst: true },
]

function TopBar() {
  return (
    <ul className="top-bar">
      {benefits.map(({ icon, highlight, text, highlightFirst }) => (
        <li key={highlight} className="top-bar__item">
          <img src={icon} alt="" width={20} height={20} />
          <p>
            {highlightFirst ? (
              <>
                <strong>{highlight}</strong> {text}
              </>
            ) : (
              <>
                {text} <strong>{highlight}</strong>
              </>
            )}
          </p>
        </li>
      ))}
    </ul>
  )
}

export default TopBar
