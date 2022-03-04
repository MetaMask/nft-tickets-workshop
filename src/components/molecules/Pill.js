import React, { useContext } from "react";
import { lighten } from 'polished'
import Jazzicon, { jsNumberForAddress } from "react-jazzicon"
import styled from "styled-components";

import { ViewContext } from '../../context/ViewProvider'

const Wrap = styled.div`
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  background-color: #161616;
  padding: 0em 1.5em;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: fit-content;
  border-radius: 50px;
  border: 3px solid #e2761b;
  p {
    color: #FFF;
  }
`

const JazziconWrap = styled.div`
  border: 1px solid ${lighten(0.5, '#16171d')};
  border-radius: 50%;
  height: 20px;
  margin: 0 .5rem;
  overflow: hidden;
  padding: 2px;
  width: 20px;
  > img {
    border-radius: 50%;
    height: 20px;
    width: 20px;
  }
`

const Pill = () => {
  const { user } = useContext(ViewContext)
  const { address } = user
  const formatAddress = (addr) => {
    return `${addr.substr(0, 6)}...${addr.substr(-4)}`;
  };

  return (
    <Wrap>
      <JazziconWrap>
        <Jazzicon diameter={20} seed={jsNumberForAddress(address)} />
      </JazziconWrap>
      <p>{formatAddress(address)}</p>
    </Wrap>
  );
};

export default Pill;
