import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Wrap = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 220px);
  grid-template-rows: repeat(2, 300px);
  /* border: 1px solid red; */
`
const NftCard = styled.div`
  height: 280px;
  border-radius: 12px;
  border: 1px solid #cfcfcf;
  margin: 8px;
`

const NftCollName = styled.div`
  padding: 8px;
`

const NftName = styled.div`
  padding: 8px;
  font-weight: 600;
`

const Tickets = ({nfts}) => {

  let nftGrid = nfts.map((nft, i) => 
    <NftCard key={`nft${i}`}>
      <Link to={`/ticketDetail/${i+1}`}>
        <img width="200" height={"200"} src={nft.image} />
        <NftCollName>Foxcon2022</NftCollName>
        <NftName>{nft.name}</NftName>
      </Link>
    </NftCard>
  )

    return (
      <Wrap>
        {nftGrid}
      </Wrap>
    );
  }
  
  export default Tickets