import styled from 'styled-components'

const TicketDetails = ({ nft }) => {

  const NftCard = styled.div`
  height: 390px;
  border-radius: 12px;
  border: 1px solid #cfcfcf;
  margin: 8px;
`

  const NftCollName = styled.div`
  padding: 8px;
`

  const NftName = styled.div`
  font-weight: 600;
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

  return (
    <div className="TicketDetails">
      <NftCard>
        <img width="300" height={"300"} src={nft.image} />
        <NftCollName>Foxcon2022</NftCollName>
        <InnerCont>
          <NftName>{nft.name}</NftName>
          <button>BUY NFT</button>
        </InnerCont>
      </NftCard>
    </div>
  );
}

export default TicketDetails