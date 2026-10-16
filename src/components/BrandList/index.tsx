import { useId } from 'react'
import brandLogo from '../../assets/images/logo-brand.svg'
import './BrandList.scss'

interface Brand {
  name: string
  logo: string
}

const brands: Brand[] = Array.from({ length: 5 }, () => ({ name: 'Econverse', logo: brandLogo }))

function BrandList() {
  const id = useId()

  return (
    <section className="brand-list" aria-labelledby={id}>
      <h2 id={id} className="brand-list__title">
        Navegue por marcas
      </h2>

      <ul className="brand-list__items">
        {brands.map(({ name, logo }, index) => (
          <li key={index}>
            <a href="#" className="brand-list__link">
              <img src={logo} alt={name} width={117} height={35} loading="lazy" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default BrandList
