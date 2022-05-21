import metaMask from '../../assets/metamask.svg'
import MetaMaskOnboarding from '@metamask/onboarding'
import { useEffect, useState, useRef } from 'react'

const ONBOARD_TEXT = 'Install MetaMask'
const CONNECT_TEXT = 'Connect'
const CONNECTED_TEXT = 'Connected'

const InstallMetaMask = () => {

  const [buttonText, setButtonText] = useState(ONBOARD_TEXT)
  const [isDisabled, setDisabled] = useState(false)
  const [accounts, setAccounts] = useState([])
  const onboarding = useRef()

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding()
    }
  }, [])
  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (accounts.length > 0) {
        setButtonText(CONNECTED_TEXT)
        setDisabled(true)
        onboarding.current.stopOnboarding()
      } else {
        setButtonText(CONNECT_TEXT)
        setDisabled(false)
      }
    }
  }, [accounts])

  const onClick = () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((newAccounts) => setAccounts(newAccounts));
    } else {
      onboarding.current.startOnboarding();
    }
  }

  return (
    <button disabled={isDisabled} onClick={onClick}>
      <img src={metaMask} alt="MetaMask Logo" />
      {buttonText}
    </button>
  )
}

export default InstallMetaMask
