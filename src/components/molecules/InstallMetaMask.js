import metaMask from '../../assets/metamask.svg'
import Button from '../atoms/Button'
import Link from '../atoms/Link'

const InstallMetaMask = () => {
  return (
    <Link link="https://metamask.io" name="MetaMask">
      <Button>
        <img src={metaMask} alt="MetaMask Logo" />
        <p>Install MetaMask</p>
      </Button>
    </Link>
  )
}

export default InstallMetaMask