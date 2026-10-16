import logo from '../../assets/images/logo.svg'
import boxIcon from '../../assets/icons/box.svg'
import heartIcon from '../../assets/icons/heart.svg'
import userIcon from '../../assets/icons/user-circle.svg'
import cartIcon from '../../assets/icons/shopping-cart.svg'
import TopBar from './TopBar'
import SearchBar from './SearchBar'
import CategoryMenu from './CategoryMenu'
import './Header.scss'

const userActions = [
  { label: 'Meus pedidos', icon: boxIcon, size: 24, modifier: 'orders' },
  { label: 'Favoritos', icon: heartIcon, size: 32 },
  { label: 'Minha conta', icon: userIcon, size: 32 },
  { label: 'Carrinho', icon: cartIcon, size: 32 },
]

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <TopBar />

        <div className="header__main">
          <a href="/" className="header__logo">
            <img src={logo} alt="Econverse" width={139} height={41} />
          </a>

          <SearchBar />

          <ul className="header__actions">
            {userActions.map(({ label, icon, size, modifier }) => (
              <li key={label}>
                <a
                  href="#"
                  aria-label={label}
                  className={`header__action${modifier ? ` header__action--${modifier}` : ''}`}
                >
                  <img src={icon} alt="" width={size} height={size} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <CategoryMenu />
      </div>
    </header>
  )
}

export default Header
