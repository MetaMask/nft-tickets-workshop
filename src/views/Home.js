import { useContext } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { ethers } from 'ethers'

import { ViewContext } from '../context/ViewProvider'
import GlobalStyles from '../theme/GlobalStyles'

import DisplayAddress from '../components/molecules/DisplayAddress'
import ConnectMetaMask from '../components/molecules/ConnectMetaMask'
import InstallMetaMask from '../components/molecules/InstallMetaMask'
import ConnectNetwork from '../components/molecules/ConnectNetwork'

import Tickets from '../components/templates/Tickets'
import TicketDetails from '../components/templates/TicketDetails'
import TicketsOwned from '../components/templates/TicketsOwned'

import vipExampleImage from '../assets/vip.png'
import gaExampleImage from '../assets/ga.png'

const Home = () => {
  const { user, chainId, actions } = useContext(ViewContext)
  const { address } = user

  const ethGaHex = ethers.utils.parseEther('0.03')._hex
  const ethVipHex = ethers.utils.parseEther('0.05')._hex

  const tickets = [
    {
      type: "ga",
      event: "Foxcon2022",
      description: "Foxcon General Admission",
      exampleImage: gaExampleImage,
      priceInWei: ethers.utils.formatEther("30000000000000000"),
      priceHexValue: ethGaHex // '0x6a94d74f430000'
    },{
      type: "vip",
      event: "Foxcon2022",
      description: "Foxcon VIP Access",
      exampleImage: vipExampleImage,
      priceInWei: ethers.utils.formatEther("50000000000000000"),
      priceHexValue: ethVipHex // '0xb1a2bc2ec50000'
    }
  ]

  return (
    <HashRouter>
      <GlobalStyles />
      <header>
        { address && chainId && chainId === 4
          ? <DisplayAddress />
          : address && chainId && chainId !== 4
            ? <ConnectNetwork />
            : window.ethereum
              ? <ConnectMetaMask connect={actions.connect} />
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
          <TicketsOwned />
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
