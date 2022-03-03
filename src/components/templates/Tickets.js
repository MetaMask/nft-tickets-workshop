import styled from 'styled-components'

const Wrap = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 400px);
  grid-template-rows: repeat(2, 400px);
  border: 1px solid red;

`
const Tickets = () => {

    return (
      <Wrap>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
      </Wrap>
    );
  }
  
  export default Tickets