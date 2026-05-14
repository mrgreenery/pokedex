import { useState, useEffect } from 'react'
import PokemonCard from '../components/PokemonCard'
import './PokedexPage.css'

const PAGE_SIZE = 20

export default function PokedexPage() {
  const [page, setPage] = useState(0)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${PAGE_SIZE}&offset=${page * PAGE_SIZE}`)
      .then(r => { if (!r.ok) throw new Error('Network error'); return r.json() })
      .then(json => { setData(json); setLoading(false) })
      .catch(e => { setError(e.message); setLoading(false) })
  }, [page])

  const totalPages = data ? Math.ceil(data.count / PAGE_SIZE) : null

  return (
    <div>
      <div className="pokedex-header">
        <h1>Pokédex</h1>
        {data && (
          <span className="total-count">{data.count} Pokémon total</span>
        )}
      </div>

      {error && <p className="error">Failed to load: {error}</p>}

      {loading ? (
        <div className="grid skeleton-grid">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <div key={i} className="skeleton-card" />
          ))}
        </div>
      ) : (
        <div className="grid">
          {data?.results.map(pokemon => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))}
        </div>
      )}

      <div className="pagination">
        <button
          className="btn"
          onClick={() => setPage(p => p - 1)}
          disabled={page === 0}
        >
          ← Previous
        </button>
        <span className="page-info">
          Page {page + 1}{totalPages ? ` of ${totalPages}` : ''}
        </span>
        <button
          className="btn"
          onClick={() => setPage(p => p + 1)}
          disabled={data && (page + 1) * PAGE_SIZE >= data.count}
        >
          Next →
        </button>
      </div>
    </div>
  )
}