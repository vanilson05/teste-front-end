import { useState, type FormEvent } from 'react'
import searchIcon from '../../../assets/icons/search.svg'
import './SearchBar.scss'

function SearchBar() {
  const [query, setQuery] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <form className="search-bar" role="search" onSubmit={handleSubmit}>
      <label htmlFor="search" className="visually-hidden">
        Buscar produtos
      </label>
      <input
        id="search"
        type="search"
        className="search-bar__input"
        placeholder="O que você está buscando?"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button type="submit" className="search-bar__button" aria-label="Buscar">
        <img src={searchIcon} alt="" width={28} height={28} />
      </button>
    </form>
  )
}

export default SearchBar
