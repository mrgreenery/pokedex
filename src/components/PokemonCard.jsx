import { useNavigate } from 'react-router-dom'
import './PokemonCard.css'

export default function PokemonCard({ pokemon }) {
  const navigate = useNavigate()
  const id = pokemon.url.split('/').filter(Boolean).pop()
  const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

  return (
    <button className="pokemon-card" onClick={() => navigate(`/pokemon/${pokemon.name}`)}>
      <img src={sprite} alt={pokemon.name} loading="lazy" />
      <span className="pokemon-id">#{String(id).padStart(3, '0')}</span>
      <span className="pokemon-name">{pokemon.name}</span>
    </button>
  )
}
