import { providers } from 'ethers'
import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { ViewContext } from '../../context/ViewProvider'

const TicketDetails = ({ ticket }) => {
  const { user, foxcon2022, signer, provider } = useContext(ViewContext)
  const { address } = user

  const [ownedTickets, setOwnedTickets] = useState(null)

  const getOwnedTickets = async() => {
    let mintedTickets = await foxcon2022.walletOfOwner(address)
    setOwnedTickets(mintedTickets)
  }

  useEffect(() => {
    getOwnedTickets()
    if(provider){
      provider.on('block', getOwnedTickets)
    }
  }, [provider])

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
    if (address) {
      foxcon2022.mintItem({
        from: address,
        value: ticket.priceHexValue
      })
      // signer.sendTransaction({
      //   from: address,
      //   to: ticket.contractAddress,
      //   value: ticket.priceHexValue,
      //   data: ticket.data,
      //   chainId: ticket.chainId
      // })
      .then(async(tx) => console.log('Mined!', tx))
      .catch((error) => console.error(error));
      // // const provider = new ethers.providers.Web3Provider(ethereum)
      // // const signer = provider.getSigner()
      // // const nftContract = new ethers.Contract(
      // //   nftContractAddress,
      // //   NFT.abi,
      // //   signer
      // // )

      // let mintItem = await foxcon2022.mintItem()
      // console.log('Mining....', mintItem.hash)
      // //setMiningStatus(0)

      // let tx = await mintItem.wait()
      // //setLoadingState(1)
      // console.log('Mined!', tx)
      // let event = tx.events[0]
      // let value = event.args[2]
      // let tokenId = value.toNumber()

      // console.log(
      //   `Mined, see transaction: https://rinkeby.etherscan.io/tx/${mintItem.hash}`
      // )
      // console.log(`tokenId`)
      // console.log(tokenId)

      // getMintedNFT(tokenId)
    } else {
      console.log("Wallet not connected.")
    }
  }

  return (
    <>
      <NftCard>
        <img width="360" height="360" src={ticket.exampleImage} alt={ticket.description} />
        <NftCollName>Foxcon2022</NftCollName>
        <InnerCont>
          <NftName>{ticket.name}</NftName>
          {
            address
              ? <button onClick={mintTicket}>Mint</button>
              : null
          }
        </InnerCont>
      </NftCard>
      { ownedTickets
        ? ownedTickets.join("-")
        : null
      }
    </>
  )
}

export default TicketDetails