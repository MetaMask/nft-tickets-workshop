import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useViewContext } from '../../context/ViewProvider';
import { MutatingDots } from 'react-loader-spinner';
import { Alert } from 'antd';

const TicketDetails = ({ ticket }) => {
    const { user, foxcon2022, chainId, isMinting, setIsMinting } =
        useViewContext();

    const { address } = user;
    const [error, setError] = useState(null);

    const NftCard = styled.div`
        width: 300px;
        height: 390px;
        border-radius: 12px;
        border: 1px solid #cfcfcf;
        margin: 8px;
    `;

    const NftCollName = styled.div`
        padding: 8px;
    `;

    const InnerCont = styled.div`
        display: flex;
        justify-content: space-between;
        padding: 8px;
        color: #222;
        button {
            background-color: #fff;
            color: inherit;
        }
    `;

    const NftName = styled.div`
        font-weight: 600;
    `;

    const StyledLoader = styled.div`
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(255, 255, 255, 0.5);
    `;

    const StyledAlert = styled(Alert)`
        border: 2px solid red;
        word-break: break-word;
        margin: 1rem 1rem 1rem 0.5rem;
    `;

    const FullScreenLoader = () => (
        <StyledLoader>
            <MutatingDots color="orange" ariaLabel="loading-indicator" />
        </StyledLoader>
    );

    const mintTicket = useCallback(() => {
        console.log('minting start');
        setIsMinting(true);
        foxcon2022
            .mintItem({
                from: address,
                value: ticket.priceHexValue,
            })
            // signer.sendTransaction({
            //   from: address,
            //   value: ticket.priceHexValue,
            //   to: ticket.contractAddress,
            //   data: ticket.data,
            //   chainId: ticket.chainId
            // })
            .then((tx) => {
                console.log(`Minting complete, mined: ${tx}`);
            })
            .catch((error) => {
                console.error(error);
                setError({ message: error?.message });
                setIsMinting(false);
            });
    }, [address, foxcon2022, setIsMinting, ticket.priceHexValue]);

    return (
        <>
            {isMinting && <FullScreenLoader />}
            <NftCard>
                <img
                    width="300"
                    height="300"
                    src={ticket.exampleImage}
                    alt={ticket.description}
                />
                <NftCollName>Foxcon2022</NftCollName>
                <InnerCont>
                    <NftName>{ticket.name}</NftName>
                    {address && chainId === 4 ? (
                        <button disabled={isMinting} onClick={mintTicket}>
                            {isMinting ? 'Minting...' : 'Mint'}
                        </button>
                    ) : !address ? (
                        <div>Not Connected to MetaMask</div>
                    ) : chainId && chainId !== 4 ? (
                        <div>Not Connected to Rinkeby</div>
                    ) : null}
                </InnerCont>
            </NftCard>
            {error && (
                <StyledAlert
                    message="Error Minting"
                    description={error?.message}
                    type="error"
                    closable
                />
            )}
        </>
    );
};

export default TicketDetails;
