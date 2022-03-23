import { useContext, useState } from 'react'
import styled from 'styled-components'
import { ViewContext } from '../../context/ViewProvider'

const NftCard = styled.div`
  width: 300px;
  height: 390px;
  border-radius: 12px;
  border: 1px solid #cfcfcf;
  margin: 8px;
  /* border: 1px solid red; */
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
const NftPrice = styled.div`
  font-weight: 400;
`

const StyledAlert = styled.div`
  padding: 1em;
  height: 60px;
  width: 800px;
  word-break: break-word;
  margin: 1rem 1rem 1rem 0.5rem;
  border: 1px solid #E2761B;
`;
const AlertMessage = styled.div`
  margin-bottom: 1em;
  font-weight: 400;
  font-size: 1em;
`

const TicketDetails = ({ ticket }) => {
  const [isMinting, setIsMinting] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const { user, foxcon2022, chainId } = useContext(ViewContext)
  const { address } = user

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
      setError(true)
      setErrorMessage(error?.message)
      setIsMinting(false)
    })
  }

  return (
    <>
      <NftCard>
        <img width="300" height="300" src={ticket.exampleImage} alt={ticket.description} />
        <NftCollName>Foxcon2022 Ticket Example</NftCollName>
        <InnerCont>
          <NftName>{ticket.name}</NftName>
          <NftPrice>{ticket.price} ETH</NftPrice>
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
      { 
        error && (
          <StyledAlert>
            <AlertMessage>Error: {errorMessage}</AlertMessage>
            <button onClick={() => setError(false)}>dismiss</button>
          </StyledAlert>
        )
      }
    </>
  )
}

export default TicketDetails