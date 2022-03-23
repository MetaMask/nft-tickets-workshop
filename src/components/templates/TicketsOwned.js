import { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { ViewContext } from '../../context/ViewProvider'
// import { ethers } from 'ethers'

const Wrap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 166px);
  grid-template-rows: repeat(150px);
  /* border: 1px solid blue; */
`

const SvgItem = styled.div`
  width: 150px;
  padding: 8px;
  cursor: pointer;
  &:hover img {
    opacity:0.5
  }
  /* border: 1px solid red; */
`

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
  
  useEffect(() => {
    if (provider) {
      let ticketsRetrieved = []
      if(ownedTickets.length > 0) {
        const promises = ownedTickets.map(async(t) => {
          const currentTokenId = t.toString()
          let currentTicket = await foxcon2022.tokenURI(currentTokenId)
          let base64ToString = window.atob(currentTicket.replace('data:application/json;base64,', ''))
          base64ToString = JSON.parse(base64ToString);
  
          ticketsRetrieved.push({
            tokenId: currentTokenId,
            svgImage: base64ToString.image,
            ticketType: base64ToString.attributes.find((x) => x.trait_type === "Ticket Type"),
          })
        })
        Promise.all(promises).then(() => setTicketCollection(ticketsRetrieved))
      }
    }
  }, [ownedTickets])

  let listOfTickets = ticketCollection.map(ticket =>
    <SvgItem key={`ticket${ticket.tokenId}`}>
      <a href={`https://testnets.opensea.io/assets/${process.env.REACT_APP_CONTRACT_ADDRESS}/${ticket.tokenId}`}
        alt={`View Token ${ticket.tokenId} on OpenSea!`} target="_blank" rel="noopener noreferrer"
      >
        <img src={ticket.svgImage} width="150" alt={`Ticket# ${ticket.tokenId}`} />
      </a>
    </SvgItem>
  )

  return (
    <>
      <hr height="1" />
      { ownedTickets.length > 0
        ? <>
            <div>You have {ownedTickets.length} ticket{ownedTickets.length > 1 ? 's' : ''}, click to view on OpenSea!</div>
            <Wrap>{listOfTickets}</Wrap>
          </>
        : null
      }
    </>
  )
}

export default TicketsOwned
