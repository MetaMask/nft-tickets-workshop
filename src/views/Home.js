import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { ViewContext } from '../context/ViewProvider'

import GlobalStyles from '../theme/GlobalStyles'
import { HashRouter, Route, Routes, Link } from 'react-router-dom'
import Tickets from '../components/templates/Tickets'
import TicketDetails from '../components/templates/TicketDetails'

const Home = () => {
  let { tokenId } = useParams()
  const { 
    foxcon2022, 
    // user, 
    // chainId 
  } = useContext(ViewContext)
  // const { address } = user
  const [nfts, setNfts] = useState([])
  const [nft, setNft] = useState({})

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
      // const nft = nfts.find(nft => {
      //   return nft.properties.ticketNumber === (1000 +Number(tokenId))
      // })
      // setNft(nft)
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
            {nfts && nfts.map((nft, idx) => {
              console.log(nft)
              return (
                <Route
                  element={<TicketDetails nft={nft} />}
                  key={idx}
                  path={`/${nft.properties.ticketNumber}`}
                />
              )
            }
            )}
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
