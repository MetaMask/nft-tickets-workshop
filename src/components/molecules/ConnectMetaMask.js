import metaMask from '../../assets/metamask.svg'
import Button from '../atoms/Button'

const ConnectMetaMask = ({ connect }) => {
  return (
    <Button handleClick={connect}>
      <img src={metaMask} alt="MetaMask Logo" />
      <p>Connect Wallet</p>
    </Button>
  )
}

export default ConnectMetaMask