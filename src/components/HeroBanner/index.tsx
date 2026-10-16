import banner from '../../assets/images/hero-banner.jpg'
import banner2x from '../../assets/images/hero-banner@2x.jpg'
import './HeroBanner.scss'

function HeroBanner() {
  return (
    <section className="hero-banner" aria-labelledby="hero-banner-title">
      <img
        className="hero-banner__image"
        src={banner}
        srcSet={`${banner} 1x, ${banner2x} 2x`}
        alt=""
        width={1440}
        height={390}
        fetchPriority="high"
      />

      <div className="hero-banner__content">
        <h1 id="hero-banner-title" className="hero-banner__title">
          Venha conhecer nossas promoções
        </h1>
        <p className="hero-banner__subtitle">
          <strong>50% Off</strong> nos produtos
        </p>
        <a href="#" className="hero-banner__button">
          Ver produto
        </a>
      </div>
    </section>
  )
}

export default HeroBanner
