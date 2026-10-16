import { useId, useState, type FormEvent } from 'react'
import './Newsletter.scss'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface FormStatus {
  type: 'success' | 'error'
  message: string
}

function validate(name: string, email: string, acceptedTerms: boolean): string | null {
  if (!name.trim()) return 'Informe seu nome.'
  if (!EMAIL_PATTERN.test(email)) return 'Informe um e-mail válido.'
  if (!acceptedTerms) return 'É preciso aceitar os termos e condições.'
  return null
}

function Newsletter() {
  const id = useId()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [status, setStatus] = useState<FormStatus | null>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const error = validate(name, email, acceptedTerms)
    if (error) {
      setStatus({ type: 'error', message: error })
      return
    }

    setStatus({ type: 'success', message: 'Inscrição realizada com sucesso!' })
    setName('')
    setEmail('')
    setAcceptedTerms(false)
  }

  return (
    <section className="newsletter" aria-labelledby={`${id}-title`}>
      <div className="newsletter__container">
        <div className="newsletter__text">
          <h2 id={`${id}-title`} className="newsletter__title">
            Inscreva-se na nossa newsletter
          </h2>
          <p className="newsletter__description">
            Assine a nossa newsletter e receba as novidades e conteúdos exclusivos da Econverse.
          </p>
        </div>

        <form className="newsletter__form" onSubmit={handleSubmit} noValidate>
          <div className="newsletter__fields">
            <label htmlFor={`${id}-name`} className="visually-hidden">
              Nome
            </label>
            <input
              id={`${id}-name`}
              type="text"
              className="newsletter__input"
              placeholder="Digite seu nome"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />

            <label htmlFor={`${id}-email`} className="visually-hidden">
              E-mail
            </label>
            <input
              id={`${id}-email`}
              type="email"
              className="newsletter__input"
              placeholder="Digite seu e-mail"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <button type="submit" className="newsletter__button">
              Inscrever
            </button>
          </div>

          <label className="newsletter__terms">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(event) => setAcceptedTerms(event.target.checked)}
            />
            Aceito os termos e condições
          </label>

          <p
            className={`newsletter__status${status ? ` newsletter__status--${status.type}` : ''}`}
            role="status"
          >
            {status?.message}
          </p>
        </form>
      </div>
    </section>
  )
}

export default Newsletter
