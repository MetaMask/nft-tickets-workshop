import { useState, useEffect } from 'react'
import Button from '../atoms/Button'
import { ethers } from 'ethers'

const useLocalStorage = (storageKey, fallbackState) => {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(storageKey)) ?? fallbackState
  )

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [value, storageKey])

  return [value, setValue]
}

const SignMessage = ({ message, address, signer }) => {
  const [isSignError, setIsSignError] = useState(false)
  const [signError, setSignError] = useState("")
  const [isSignSuccess, setIsSignSuccess] = useState(false)
  const [signedSuccess, setSignedSuccess] = useState("")
  const [verifyMessage, setVerifyMessage] = useState("")
  const [verifyErrorMessage, setVerifyErrorMessage] = useState("")

  const [isOpen, setOpen] = useLocalStorage('is-open', false)
  const handleToggle = () => setOpen(!isOpen)

  const handleVerifyMessage = async ({ message, address }) => {
    try {
      const signerAddress = await ethers.utils.verifyMessage(message, signedSuccess)

      if (signerAddress !== address) {
        return false;
      }
  
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  const signMessage = async () => {
      // await signer.signMessage("I agree to the terms and services at:\nhttps://metamask.com/tos")
      await window.ethereum.request({
        method: 'personal_sign',
        params: [message, address]
      })
      .then(res => {
        setIsSignError(false)
        setIsSignSuccess(true)
        setSignedSuccess(res)
      })
      .catch(err => {
        setIsSignSuccess(false)
        setIsSignError(true)
        setSignError(err.message)
      })
  }

  const handleVerification = async () => {
    const isValid = await handleVerifyMessage({ message, address })

    if (isValid) {
      console.log(isValid)
      setVerifyMessage("Signature is valid!")
    } else {
      console.log(isValid)
      setVerifyErrorMessage("Invalid signature")
    }
  }

  return (
    <>
      <Button handleClick={signMessage}>
        <p>Sign Message</p>
      </Button>
      <Button handleClick={handleToggle}>
        <p>Toggle - {isOpen ? "true" : "false"}</p>
      </Button>
      {/* {signedKeys.map(x => <div key={`${x}-sk's`}>{x}</div>)} */}
      {
        isSignError
          ? <span>{signError}</span>
          : isSignSuccess
            ? <>
              <span>Successful Sign</span>
              <span>{signedSuccess}</span>
              <Button handleClick={handleVerification}>
                <p>Verify Message</p>
              </Button>
              {
                verifyMessage !== ""
                  ? verifyMessage
                  : verifyErrorMessage
              }
            </>
            : null
      }
    </>
  )
}

export default SignMessage