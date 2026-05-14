import './AboutPage.css'

export default function AboutPage() {
  return (
    <div className="about-page">
      <h1>About</h1>
      <div className="about-card">
        <img src="/pokedex/pokeball.svg" alt="Pokéball" width={80} height={80} />
        <h2>Pokédex</h2>
        <p>
          A digital Pokémon encyclopedia built with{' '}
          <strong>React</strong> and <strong>Vite</strong>. Browse all Pokémon,
          view their types, stats, abilities, height and weight — all powered
          by the free and open-source <a href="https://pokeapi.co/" target="_blank" rel="noreferrer">PokéAPI</a>.
        </p>
        <ul className="feature-list">
          <li>Browse all 1000+ Pokémon with pagination</li>
          <li>Detailed view with stats, abilities, and sprites</li>
          <li>Type-coloured hero sections</li>
          <li>Fast loading with shimmer skeletons</li>
        </ul>
        <div className="tech-stack">
          <span>React 18</span>
          <span>React Router 6</span>
          <span>Vite</span>
          <span>PokéAPI</span>
        </div>
      </div>
    </div>
  )
}