import logo from '../../assets/images/logo-footer.svg'
import instagramIcon from '../../assets/icons/instagram.svg'
import facebookIcon from '../../assets/icons/facebook.svg'
import linkedinIcon from '../../assets/icons/linkedin.svg'
import './Footer.scss'

interface LinkGroup {
  title: string
  links: string[]
}

const socialLinks = [
  { name: 'Instagram', icon: instagramIcon },
  { name: 'Facebook', icon: facebookIcon },
  { name: 'LinkedIn', icon: linkedinIcon },
]

const linkGroups: LinkGroup[] = [
  { title: 'Institucional', links: ['Sobre Nós', 'Movimento', 'Trabalhe conosco'] },
  { title: 'Ajuda', links: ['Suporte', 'Fale Conosco', 'Perguntas Frequentes'] },
  { title: 'Termos', links: ['Termos e Condições', 'Política de Privacidade', 'Troca e Devolução'] },
]

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__main">
        <div className="footer__about">
          <img src={logo} alt="Econverse" width={164} height={48} loading="lazy" />
          <p className="footer__text">
            Tecnologia, moda, casa e muito mais em um só lugar, com compra segura e entrega para
            todo o Brasil.
          </p>

          <ul className="footer__social">
            {socialLinks.map(({ name, icon }) => (
              <li key={name}>
                <a href="#" aria-label={name} className="footer__social-link">
                  <img src={icon} alt="" width={24} height={24} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <span className="footer__divider" aria-hidden="true" />

        <nav className="footer__nav" aria-label="Links institucionais">
          {linkGroups.map(({ title, links }) => (
            <div key={title} className="footer__group">
              <h2 className="footer__group-title">{title}</h2>
              <ul className="footer__links">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="footer__link">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="footer__bottom">
        <p>&copy; 2026 Econverse. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer
