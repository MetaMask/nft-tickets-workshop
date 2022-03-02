import Web3 from 'web3'
import Foxcon2022 from './Foxcon2022.json'

let web3 = new Web3(process.env.REACT_APP_INFURA_ENDPOINT)

const contractAddress = process.env.REACT_APP_NFT_CONTRACT_ADDRESS
const contract = new web3.eth.Contract(Foxcon2022.abi, contractAddress)

export { web3, contract, contractAddress }