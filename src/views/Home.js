import React, { useContext } from 'react'

import { ViewContext } from '../context/ViewProvider'


import GlobalStyles from '../theme/GlobalStyles'
import { HashRouter, Route, Routes, Link } from 'react-router-dom'
import Tickets from '../components/templates/Tickets'
// import TicketDetails from '../components/templates/TicketDetails' 

const Home = () => {
  const { foxcon2022, user, chainId } = useContext(ViewContext)
  const { address } = user

  console.log(foxcon2022)

  return (
    <HashRouter>
      <GlobalStyles />
      <header>
        <div>header</div>
      </header>
      <nav>
        <ul>
          <li><Link to="/ticketDetail/1">NFT 1001</Link></li>
          <li><Link to="/ticketDetail/2">NFT 1002</Link></li>
          <li><Link to="/ticketDetail/3">NFT 1003</Link></li>
        </ul>
      </nav>
      <main>
        <div>
          <Routes>
            <Route path="/" exact element={<Tickets />} />
            {/* <Route path="/ticketDetail/:tokenId" element={<TicketDetails />} /> */}
          </Routes>
        </div>
      </main>
      <footer>
        <div>footer</div>
      </footer>
    </HashRouter>
  )
}

export default Home
