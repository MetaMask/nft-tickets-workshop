import Button from '../atoms/Button'
import { useState } from 'react'

const GetPermissions = () => {
  const [permissions, setPermissions] = useState({})
  const [permissionRequested, setPermissionRequested] = useState(false)

  const requestPermissions = async () => {
    await window.ethereum.request({
      method: 'wallet_requestPermissions',
      params: [
        { "eth_accounts": {} }
      ]
    })
    .then((res) => {
      setPermissionRequested(true)
    })
  }

  const getPermissions = async () => {
    await window.ethereum.request({
      method: 'wallet_getPermissions'
    })
    .then((res) => {
      setPermissions(res[0])
      console.log(res)
    })
  }

  return (
    <>
      <Button handleClick={requestPermissions}>
        <p>Request Permissions</p>
      </Button>
      <Button handleClick={getPermissions}>
        <p>Get Accounts</p>
      </Button>
      <div>caveats.value: 
        { permissionRequested ?
          permissions.caveats[0].value.map(account => <div key={account}>{account}</div>)
          : null
        }
      </div>
      <div>date: {permissions.date}</div>
      <div>id: {permissions.id}</div>
      <div>invoker: {permissions.invoker}</div>
      <div>parentCapability: {permissions.parentCapability}</div>
    </>
  )
}

export default GetPermissions
