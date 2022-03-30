import { Link, HashRouter, Route, Routes } from 'react-router-dom'
import GlobalStyles from '../theme/GlobalStyles'

/* Imports */
import Tickets from '../components/templates/Tickets'

const Home = () => {
  /* Top Level Code */
  return (
    <HashRouter>
      <GlobalStyles />
      <header>
        {/* Header */}
      </header>
      <nav>
        <ul>
          <li><Link to={`/`}>Tickets</Link></li>
        </ul>
      </nav>
      <main>
        <div>
          <Routes>
            <Route path="/" exact element={<Tickets tickets={{}} />} />
            {/* Setup Routes */}
          </Routes>
        </div>
        {/* Tickets Owned Display */}
      </main>
      <footer>
        <div>Foxcon2022</div>
      </footer>
    </HashRouter>
  )
}

export default Home
