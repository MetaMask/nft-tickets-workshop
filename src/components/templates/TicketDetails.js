import { useContext } from 'react'
import styled from 'styled-components'
import { ViewContext } from '../../context/ViewProvider'

const TicketDetails = ({ ticket }) => {
  const { user, foxcon2022 } = useContext(ViewContext)
  const { address } = user

  const NftCard = styled.div`
    width: 360px;
    height: 460px;
    border-radius: 12px;
    border: 1px solid #cfcfcf;
    margin: 8px;
  `

  const NftCollName = styled.div`
    padding: 8px;
  `

  const InnerCont = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 8px;
    color: #222;
    button {
      background-color: #FFF;
      color: inherit;
    }
  `

  const NftName = styled.div`
    font-weight: 600;
  `

  const mintTicket = async () => {
    console.log("minting start")
      foxcon2022.mintItem({
        from: address,
        value: ticket.priceHexValue
      })
      // signer.sendTransaction({
      //   from: address,
      //   value: ticket.priceHexValue,
      //   to: ticket.contractAddress,
      //   data: ticket.data,
      //   chainId: ticket.chainId
      // })
      .then((tx) => console.log('Mined!', tx))
      .catch((error) => console.error(error))
  }

  return (
    <>
      <NftCard>
        <img width="360" height="360" src={ticket.exampleImage} alt={ticket.description} />
        <NftCollName>Foxcon2022</NftCollName>
        <InnerCont>
          <NftName>{ticket.name}</NftName>
          { address ? <button onClick={mintTicket}>Mint</button> : null }
        </InnerCont>
      </NftCard>
    </>
  )
}

export default TicketDetails