import { createHashRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import PokedexPage from './pages/PokedexPage'
import PokemonDetailPage from './pages/PokemonDetailPage'
import AboutPage from './pages/AboutPage'

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <PokedexPage /> },
      { path: 'pokemon/:name', element: <PokemonDetailPage /> },
      { path: 'about', element: <AboutPage /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
