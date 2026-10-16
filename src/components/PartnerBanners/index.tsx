import { useId } from 'react'
import partnerImage from '../../assets/images/partner-banner.jpg'
import partnerImage2x from '../../assets/images/partner-banner@2x.jpg'
import './PartnerBanners.scss'

interface PartnerBanner {
  title: string
  description: string
}

const banners: PartnerBanner[] = [
  { title: 'Parceiros', description: 'Lorem ipsum dolor sit amet, consectetur' },
  { title: 'Parceiros', description: 'Lorem ipsum dolor sit amet, consectetur' },
]

function PartnerBanners() {
  const id = useId()

  return (
    <section className="partner-banners" aria-labelledby={id}>
      <h2 id={id} className="visually-hidden">
        Nossos parceiros
      </h2>

      {banners.map(({ title, description }, index) => (
        <article key={index} className="partner-banners__item">
          <img
            className="partner-banners__image"
            src={partnerImage}
            srcSet={`${partnerImage} 1x, ${partnerImage2x} 2x`}
            alt="Loja parceira com computadores e notebooks Apple em exposição"
            width={634}
            height={350}
            loading="lazy"
          />

          <div className="partner-banners__content">
            <h3 className="partner-banners__title">{title}</h3>
            <p className="partner-banners__description">{description}</p>
            <a href="#" className="partner-banners__button">
              Confira
            </a>
          </div>
        </article>
      ))}
    </section>
  )
}

export default PartnerBanners
