import './HeroBanner.scss'

// Fica em /public para ser pré-carregado no index.html (é o maior elemento da primeira dobra)
const BANNER = '/images/hero-banner.webp'
const BANNER_2X = '/images/hero-banner@2x.webp'

function HeroBanner() {
  return (
    <section className="hero-banner" aria-labelledby="hero-banner-title">
      <img
        className="hero-banner__image"
        src={BANNER}
        srcSet={`${BANNER} 1x, ${BANNER_2X} 2x`}
        alt="Vitrine de loja com letreiros de Black Friday em neon azul"
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
