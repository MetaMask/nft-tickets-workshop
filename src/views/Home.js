import React, { useContext, useEffect, useState } from 'react'

import { ViewContext } from '../context/ViewProvider'

import GlobalStyles from '../theme/GlobalStyles'
import { HashRouter, Route, Routes, Link } from 'react-router-dom'
import Tickets from '../components/templates/Tickets'
// import TicketDetails from '../components/templates/TicketDetails'

const Home = () => {
  const { 
    foxcon2022, 
    // user, 
    // chainId 
  } = useContext(ViewContext)
  // const { address } = user
  const [nfts, setNfts] = useState([])

  const getTokenJsonById = async (id) => {
    let tokenUrl = await foxcon2022.tokenURI(id)
    let tokenResult = await fetch(tokenUrl)
      .then(res => res.json())

    return tokenResult
  }

  const buildNftArray = async () => {
    const totalSupply = (await foxcon2022.totalSupply()).toNumber()
    var nfts = []
    for (let i = 1; i <= totalSupply; i++) {
      let tokenResult = await getTokenJsonById(i)
      nfts.push(tokenResult)
    }
    setNfts(nfts)
  }

  useEffect(() => {
    if (foxcon2022) {
      buildNftArray()
    }
  }, [foxcon2022])

  return (
    <HashRouter>
      <GlobalStyles />
      <header>
        <div>header</div>
      </header>
      {/* <nav></nav> */}
      <main>
        <div>
          <Routes>
            <Route path="/" exact element={<Tickets nfts={nfts}/>} />
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
