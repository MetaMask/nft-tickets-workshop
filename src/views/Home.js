import { useContext } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { ethers } from 'ethers'

import { ViewContext } from '../context/ViewProvider'
import GlobalStyles from '../theme/GlobalStyles'

import Pill from '../components/molecules/Pill'
import ConnectButton from '../components/molecules/ConnectButton'
import InstallMetaMask from '../components/molecules/InstallMetaMask'
import NetworkButton from '../components/molecules/NetworkButton'

import Tickets from '../components/templates/Tickets'
import TicketDetails from '../components/templates/TicketDetails'

import vipExampleImage from '../assets/vip.png'
import gaExampleImage from '../assets/ga.png'

const Home = () => {
  const { foxcon2022, user, chainId, actions } = useContext(ViewContext)
  const { address } = user
  const tickets = [
    {
      event: "Foxcon2022",
      type: "vip",
      description: "Foxcon VIP Access",
      priceInWei: ethers.utils.formatEther("50000000000000000"),
      priceHexValue: '0x6a94d74f430000',
      data: 'eb93406b',
      chainId: '0x4',
      contractAddress: process.env.REACT_APP_CONTRACT_ADDRESS,
      exampleImage: vipExampleImage
    },{
      event: "Foxcon2022",
      type: "ga",
      description: "Foxcon General Admission",
      priceInWei: ethers.utils.formatEther("30000000000000000"),
      priceHexValue: '0x6a94d74f430000',
      data: 'eb93406b',
      chainId: '0x4',
      contractAddress: process.env.REACT_APP_CONTRACT_ADDRESS,
      exampleImage: gaExampleImage
    }
  ]

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
            <Route path="/" exact element={<Tickets tickets={tickets} />} />
            {tickets && tickets.map((ticket, i) =>
              <Route key={`ticket-route${i}`} element={<TicketDetails ticket={ticket} />} path={`/${ticket.type}`} />
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
