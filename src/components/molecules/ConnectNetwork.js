import { useContext } from 'react'
import { ViewContext } from '../../context/ViewProvider'
import Button from '../atoms/Button'

const ConnectNetwork = () => {
  const { provider } = useContext(ViewContext)

  const addSwitchNetwork = async () => {
    if (provider) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x4' }],
        })
      } catch (error) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x4', // A 0x-prefixed hexadecimal string
                blockExplorerUrls: ['https://rinkeby.etherscan.io'],
                chainName: 'Rinkeby Test Network',
                nativeCurrency: {
                  decimals: 18,
                  name: 'Ether',
                  symbol: 'ETH'
                },
                rpcUrls: ['https://rinkeby.infura.io/v3/0d73cc5bbe184146957a9d00764db99f']
              },
            ],
          })
        } catch (error) {
          // user rejects the request to "add chain" or param values are wrong, maybe you didn't use hex above for `chainId`?
          console.log(`wallet_addEthereumChain Error: ${error.message}`)
        }
        // handle other "switch" errors
      }
    }
  }

  return (
    <Button handleClick={addSwitchNetwork}>
      <p>Connect Rinkeby</p>
    </Button>
  )
}

export default ConnectNetwork