import { Link, HashRouter, Route, Routes } from 'react-router-dom'
import GlobalStyles from '../theme/GlobalStyles'

import { useContext } from 'react'
import { ViewContext } from '../context/ViewProvider'

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
  const { user, chainId, actions, bigNumberify } = useContext(ViewContext)
  const { address } = user

  const ethGa = '0.01'
  const ethVip = '0.02'
  const ethGaHex = bigNumberify(ethGa)._hex
  const ethVipHex = bigNumberify(ethVip)._hex

  const tickets = [
    {
      type: "ga",
      event: "Foxcon2022",
      description: "Foxcon General Admission",
      exampleImage: gaExampleImage,
      price: ethGa,
      priceHexValue: ethGaHex // '0x2386f26fc10000' *eserialize.com
    },{
      type: "vip",
      event: "Foxcon2022",
      description: "Foxcon VIP Access",
      exampleImage: vipExampleImage,
      price: ethVip,
      priceHexValue: ethVipHex // '0x470de4df820000' *eserialize.com
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
      <nav>
        <ul>
          <li><Link to={`/`}>Tickets</Link></li>
        </ul>
      </nav>
      <main>
        <div>
          <Routes>
            <Route path="/" exact element={<Tickets tickets={tickets} />} />
            {tickets && tickets.map((ticket, i) =>
              <Route key={`ticket-route${i}`} element={<TicketDetails ticket={ticket} />} path={`/${ticket.type}`} />
            )}
          </Routes>
          <TicketsOwned />
          { !address
              ? <div>Not Connected to MetaMask</div> 
              : chainId && (chainId !== 4)
                ? <div>Not Connected to Rinkeby ({chainId})</div>
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
