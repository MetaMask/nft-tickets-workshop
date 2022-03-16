import { useState, useEffect, useContext } from 'react'
import { ViewContext } from '../../context/ViewProvider'


const TicketsOwned = () => {
  const { user, foxcon2022, provider } = useContext(ViewContext)
  const { address } = user
  const [ownedTickets, setOwnedTickets] = useState([])
  // const [ticketCollection, setTicketCollection] = useState([])

  const getOwnedTickets = async () => {
    let mintedTickets = await foxcon2022.walletOfOwner(address)
    setOwnedTickets(mintedTickets)
  }

  useEffect(() => {
    if (provider) {
      provider.on('block', getOwnedTickets)
    }
    console.log(ownedTickets)
  }, [provider])
  
  // const listOfTickets = ticketCollection.map(ticket => 
  //   <li key={ticket.tokenId}>{ticket.tokenId}</li>
  // )

  const listOfTokens = ownedTickets.map(tokenId => 
    <li key={tokenId.toString()}>
      <a href={`https://testnets.opensea.io/assets/${process.env.REACT_APP_CONTRACT_ADDRESS}/${tokenId.toString()}`}
        alt={`View Token ${tokenId.toString()} on OpenSea!`}
      >
        {tokenId.toString()}
      </a>
    </li>
  )

  return (
    <>
      <hr height="1" />
      { ownedTickets.length > 0
        ? <>
            <div>You have {ownedTickets.length} tickets, click to view on OpenSea!</div>
            <ul>
              {listOfTokens}
            </ul>
          </>
        : null
      }
      {/* { ticketCollection.length > 0
        ? <ul>{listOfTickets}</ul>
        : null
      } */}
    </>
  )
}

export default TicketsOwned
