import { useContext } from 'react'
import { ViewContext } from '../../context/ViewProvider'
import SignMessage from '../molecules/SignMessage'

const Sign = () => {
  const { user, provider } = useContext(ViewContext)
  const { address } = user
  const message = "I agree to the terms and services at:\nhttps://metamask.com/tos"

  return (
    <>
      <div>
        <SignMessage 
          message={message}
          address={address.toString()}
          provider={provider}
        />
      </div>
    </>
  )
}

export default Sign