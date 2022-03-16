import { useState, useEffect, useContext } from 'react'
import { ViewContext } from '../../context/ViewProvider'


const TicketsOwned = () => {
  const { user, foxcon2022, provider } = useContext(ViewContext)
  const { address } = user
  const [ownedTickets, setOwnedTickets] = useState([])
  const [ticketCollection, setTicketCollection] = useState([])

  const getOwnedTickets = async () => {
    let mintedTickets = await foxcon2022.walletOfOwner(address)
    setOwnedTickets(mintedTickets)
  }

  useEffect(() => {
    if (provider) {
      provider.on('block', getOwnedTickets)
    }
  }, [provider])
  
  const listItems = ticketCollection.map(li => 
    <li key={li.tokenId}>{li.tokenId}</li>
  )

  return (
    <>
      <hr height="1" />
      { ownedTickets.length > 0
        ? <>
          <div>You have {ownedTickets.length} tickets already! </div>
          {ownedTickets ? ownedTickets.join(", ") : null}
        </>
        : null
      }
      { ticketCollection.length > 0
        ? <ul>{listItems}</ul>
        : null
      }
    </>
  )
}

export default TicketsOwned
