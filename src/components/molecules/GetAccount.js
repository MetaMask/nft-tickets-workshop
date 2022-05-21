import Button from '../atoms/Button'
import { useState } from 'react'

const GetAccount = () => {
  const [account, setAccount] = useState()

  const getAccounts = async () => {
    try {
      await window.ethereum.request({
        method: 'eth_accounts'
      })
      .then((res) => {
        setAccount(res)
        console.log(res)
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Button handleClick={getAccounts}>
        <p>Get Account</p>
      </Button>
      <span>{account}</span>
    </>
  )
}

export default GetAccount
