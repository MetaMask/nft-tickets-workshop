import GetAccount from '../molecules/GetAccount'
import GetPermissions from '../molecules/GetPermissions'

const Accounts = () => {

  return (
    <>
      <h1>Account</h1>
      <GetAccount />
      <h1>Permissions</h1>
      <GetPermissions />
    </>
  )
}

export default Accounts