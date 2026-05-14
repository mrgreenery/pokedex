import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './PokemonDetailPage.css'

const TYPE_COLORS = {
  normal: '#A8A878', fire: '#F08030', water: '#6890F0', electric: '#F8D030',
  grass: '#78C850', ice: '#98D8D8', fighting: '#C03028', poison: '#A040A0',
  ground: '#E0C068', flying: '#A890F0', psychic: '#F85888', bug: '#A8B820',
  rock: '#B8A038', ghost: '#705898', dragon: '#7038F8', dark: '#705848',
  steel: '#B8B8D0', fairy: '#EE99AC',
}

const STAT_LABELS = {
  hp: 'HP', attack: 'Attack', defense: 'Defense',
  'special-attack': 'Sp. Atk', 'special-defense': 'Sp. Def', speed: 'Speed',
}

export default function PokemonDetailPage() {
  const { name } = useParams()
  const navigate = useNavigate()
  const [pokemon, setPokemon] = useState(null)
  const [species, setSpecies] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    setPokemon(null)
    setSpecies(null)

    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(r => { if (!r.ok) throw new Error('Pokémon not found'); return r.json() })
      .then(data => {
        setPokemon(data)
        return fetch(data.species.url)
      })
      .then(r => r.json())
      .then(s => { setSpecies(s); setLoading(false) })
      .catch(e => { setError(e.message); setLoading(false) })
  }, [name])

  const description = species?.flavor_text_entries
    ?.find(e => e.language.name === 'en')
    ?.flavor_text.replace(/\f/g, ' ') ?? ''

  const primaryType = pokemon?.types[0]?.type.name
  const bgColor = primaryType ? TYPE_COLORS[primaryType] : '#eee'

  if (loading) return <div className="detail-loading">Loading…</div>
  if (error) return (
    <div className="detail-error">
      <p>{error}</p>
      <button className="btn" onClick={() => navigate(-1)}>Go back</button>
    </div>
  )

  return (
    <div className="detail-page">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

      <div className="detail-card" style={{ '--type-color': bgColor }}>
        <div className="detail-hero">
          <img
            src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
            alt={pokemon.name}
            className="detail-sprite"
          />
          <div className="detail-meta">
            <span className="detail-id">#{String(pokemon.id).padStart(3, '0')}</span>
            <h1 className="detail-name">{pokemon.name}</h1>
            <div className="type-badges">
              {pokemon.types.map(({ type }) => (
                <span
                  key={type.name}
                  className="type-badge"
                  style={{ background: TYPE_COLORS[type.name] }}
                >
                  {type.name}
                </span>
              ))}
            </div>
            {description && <p className="description">{description}</p>}
          </div>
        </div>

        <div className="detail-sections">
          <section className="info-section">
            <h2>Info</h2>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Height</span>
                <span className="info-value">{(pokemon.height / 10).toFixed(1)} m</span>
              </div>
              <div className="info-item">
                <span className="info-label">Weight</span>
                <span className="info-value">{(pokemon.weight / 10).toFixed(1)} kg</span>
              </div>
              <div className="info-item">
                <span className="info-label">Base XP</span>
                <span className="info-value">{pokemon.base_experience ?? '—'}</span>
              </div>
            </div>
          </section>

          <section className="abilities-section">
            <h2>Abilities</h2>
            <div className="ability-list">
              {pokemon.abilities.map(({ ability, is_hidden }) => (
                <span key={ability.name} className={`ability-badge ${is_hidden ? 'hidden' : ''}`}>
                  {ability.name}{is_hidden ? ' (hidden)' : ''}
                </span>
              ))}
            </div>
          </section>

          <section className="stats-section">
            <h2>Base Stats</h2>
            <div className="stat-list">
              {pokemon.stats.map(({ stat, base_stat }) => (
                <div key={stat.name} className="stat-row">
                  <span className="stat-label">{STAT_LABELS[stat.name] ?? stat.name}</span>
                  <span className="stat-value">{base_stat}</span>
                  <div className="stat-bar-bg">
                    <div
                      className="stat-bar"
                      style={{
                        width: `${Math.min(100, (base_stat / 255) * 100)}%`,
                        background: base_stat >= 100 ? '#4caf50' : base_stat >= 60 ? '#ff9800' : '#f44336',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="sprites-section">
            <h2>Sprites</h2>
            <div className="sprites-grid">
              {[
                pokemon.sprites.front_default,
                pokemon.sprites.back_default,
                pokemon.sprites.front_shiny,
                pokemon.sprites.back_shiny,
              ].filter(Boolean).map((src, i) => (
                <img key={i} src={src} alt={`${pokemon.name} sprite`} className="sprite-thumb" />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}