import { useState } from 'react'
import technologyIcon from '../../assets/images/categories/technology.png'
import supermarketIcon from '../../assets/images/categories/supermarket.png'
import drinksIcon from '../../assets/images/categories/drinks.png'
import toolsIcon from '../../assets/images/categories/tools.png'
import healthIcon from '../../assets/images/categories/health.png'
import sportsIcon from '../../assets/images/categories/sports.png'
import fashionIcon from '../../assets/images/categories/fashion.png'
import './CategoryList.scss'

interface Category {
  name: string
  icon: string
}

const categories: Category[] = [
  { name: 'Tecnologia', icon: technologyIcon },
  { name: 'Supermercado', icon: supermarketIcon },
  { name: 'Bebidas', icon: drinksIcon },
  { name: 'Ferramentas', icon: toolsIcon },
  { name: 'Saúde', icon: healthIcon },
  { name: 'Esportes e Fitness', icon: sportsIcon },
  { name: 'Moda', icon: fashionIcon },
]

function CategoryList() {
  const [activeCategory, setActiveCategory] = useState(categories[0].name)

  return (
    <section className="category-list" aria-labelledby="category-list-title">
      <h2 id="category-list-title" className="visually-hidden">
        Compre por categoria
      </h2>

      <ul className="category-list__items">
        {categories.map(({ name, icon }) => {
          const isActive = name === activeCategory

          return (
            <li key={name}>
              <button
                type="button"
                className={`category-list__item${isActive ? ' category-list__item--active' : ''}`}
                aria-pressed={isActive}
                onClick={() => setActiveCategory(name)}
              >
                <span className="category-list__icon">
                  <img src={icon} alt="" width={61} height={61} />
                </span>
                <span className="category-list__name">{name}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default CategoryList
