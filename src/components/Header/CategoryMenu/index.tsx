import crownIcon from '../../../assets/icons/crown.svg'
import './CategoryMenu.scss'

interface MenuItem {
  label: string
  highlight?: boolean
  icon?: string
}

const menuItems: MenuItem[] = [
  { label: 'Todas categorias' },
  { label: 'Supermercado' },
  { label: 'Livros' },
  { label: 'Moda' },
  { label: 'Lançamentos' },
  { label: 'Ofertas do dia', highlight: true },
  { label: 'Assinatura', icon: crownIcon },
]

function CategoryMenu() {
  return (
    <nav className="category-menu" aria-label="Categorias">
      <ul className="category-menu__list">
        {menuItems.map(({ label, highlight, icon }) => (
          <li key={label}>
            <a
              href="#"
              className={`category-menu__link${highlight ? ' category-menu__link--highlight' : ''}`}
            >
              {icon && <img src={icon} alt="" width={20} height={20} />}
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default CategoryMenu
