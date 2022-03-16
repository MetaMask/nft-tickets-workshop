import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Wrap = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 280px);
  grid-template-rows: repeat(1, 120px);
  /* border: 1px solid red; */
`
const NftCard = styled.div`
  height: 80px;
  width: 260px;
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

const Tickets = ({ tickets }) => {

  let nftGrid = tickets.map((ticket, i) =>
    <NftCard key={`ticket${i}`}>
      <Link to={`/${ticket.type}`}>
        <NftCollName>{ticket.event}</NftCollName>
        <NftName>{ticket.description}</NftName>
      </Link>
    </NftCard>
  )

  return (
    <>
      <h1>Tickets Available</h1>
      <Wrap>{nftGrid}</Wrap>
    </>
  )
}

export default Tickets