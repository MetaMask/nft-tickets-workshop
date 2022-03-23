import { useContext, useState } from 'react'
import styled from 'styled-components'
import { ViewContext } from '../../context/ViewProvider'

const TicketDetails = ({ ticket }) => {
  const [isMinting, setIsMinting] = useState(false);
  const { user, foxcon2022, chainId } = useContext(ViewContext)
  const { address } = user

  const NftCard = styled.div`
    width: 300px;
    height: 390px;
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
    setIsMinting(true)

    foxcon2022.mintItem({
      from: address,
      value: ticket.priceHexValue
    })
    .then(async(tx) => {
      await tx.wait()
      console.log(`Minting complete, mined: ${tx}`)
      setIsMinting(false)
    })
    .catch((error) => {
      console.error(error)
      setIsMinting(false)
    })
  }

  return (
    <>
      <NftCard>
        <img width="300" height="300" src={ticket.exampleImage} alt={ticket.description} />
        <NftCollName>Foxcon2022</NftCollName>
        <InnerCont>
          <NftName>{ticket.name}</NftName>
          { address && (chainId === 4 || chainId === 1337)
            ? <button disabled={isMinting} onClick={mintTicket}>{isMinting ? 'Minting...' : 'Mint'}</button>
            : !address
              ? <div>Not Connected to MetaMask</div> 
              : chainId && chainId !== 4 
                ? <div>Not Connected to Rinkeby</div>
                : null 
          }
        </InnerCont>
      </NftCard>
    </>
  )
}

export default TicketDetails