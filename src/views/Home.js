import { useContext, useEffect, useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { ViewContext } from '../context/ViewProvider'
import GlobalStyles from '../theme/GlobalStyles'

import Pill from '../components/molecules/Pill'
import ConnectButton from '../components/molecules/ConnectButton'
import InstallMetaMask from '../components/molecules/InstallMetaMask'
import NetworkButton from '../components/molecules/NetworkButton'

import Tickets from '../components/templates/Tickets'
import TicketDetails from '../components/templates/TicketDetails'

const Home = () => {
  const { foxcon2022, user, chainId, actions } = useContext(ViewContext)
  const { address } = user
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
      let tokenResult = await getTokenJsonById(1000 + i)
      nfts.push(tokenResult)
    }
    setNfts(nfts)
  }

  useEffect(() => {
    if (foxcon2022 && chainId === 4) {
      buildNftArray()
    }
  }, [foxcon2022])

  return (
    <HashRouter>
      <GlobalStyles />
      <header>
        { chainId && chainId !== 4
          ? <NetworkButton />
          : address
            ? <Pill />
            : window.ethereum
              ? <ConnectButton connect={actions.connect} />
              : <InstallMetaMask />
        }
      </header>
      <main>
        <div>
          <Routes>
            <Route path="/" exact element={<Tickets nfts={nfts} />} />
            {nfts && nfts.map((nft, idx) =>
              <Route key={idx} element={<TicketDetails nft={nft} />} path={`/${nft.properties.ticketNumber}`} />
            )}
          </Routes>
          {
            chainId !== 4 
              ? <span>Not Connected to Rinkeby Testnet</span> 
              : null
          }
        </div>
      </main>
      <footer>
        <div>Foxcon2022</div>
      </footer>
    </HashRouter>
  )
}

export default Home
