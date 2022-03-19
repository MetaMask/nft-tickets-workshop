import { useState, useEffect, useCallback } from 'react';
import { useViewContext } from '../../context/ViewProvider';

const TicketsOwned = () => {
    const { user, foxcon2022, provider, setIsMinting } = useViewContext();
    const { address } = user;
    const [ownedTickets, setOwnedTickets] = useState([]);

    const getOwnedTickets = useCallback(async () => {
        let mintedTickets = await foxcon2022.walletOfOwner(address);
        if (
            mintedTickets.length > 0 &&
            ownedTickets.length > 0 &&
            mintedTickets.length > ownedTickets.length
        ) {
            setIsMinting(false);
        }
        setOwnedTickets(mintedTickets);
    }, [address, foxcon2022, ownedTickets, setIsMinting]);

    useEffect(() => {
        if (provider) {
            provider.on('block', getOwnedTickets);
        }
    }, [getOwnedTickets, ownedTickets, provider]);

    // const listOfTickets = ticketCollection.map(ticket =>
    //   <li key={ticket.tokenId}>{ticket.tokenId}</li>
    // )

    const listOfTokens = ownedTickets.map((tokenId) => (
        <li key={tokenId.toString()}>
            <a
                href={`https://testnets.opensea.io/assets/${
                    process.env.REACT_APP_CONTRACT_ADDRESS
                }/${tokenId.toString()}`}
                alt={`View Token ${tokenId.toString()} on OpenSea!`}
                target="_blank"
                rel="noopener noreferrer"
            >
                {tokenId.toString()}
            </a>
        </li>
    ));

    return (
        <>
            <hr height="1" />
            {ownedTickets.length > 0 ? (
                <>
                    <div>
                        You have {ownedTickets.length} ticket
                        {ownedTickets.length > 1 ? 's' : ''}, click to view on
                        OpenSea!
                    </div>
                    <ul>{listOfTokens}</ul>
                </>
            ) : null}
            {/* { ticketCollection.length > 0
        ? <ul>{listOfTickets}</ul>
        : null
      } */}
        </>
    );
};

export default TicketsOwned;
