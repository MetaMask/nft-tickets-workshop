require('dotenv').config();

const HDWalletProvider = require('@truffle/hdwallet-provider')
const mnemonic = process.env.OWNER_MNEMONIC
const owner = process.env.OWNER_ADDRESS
const infura_endpoint_rinkeby = process.env.INFURA_ENDPOINT_RINKEBY
const infura_endpoint_polygon = process.env.INFURA_ENDPOINT_POLYGON

module.exports = {
  plugins: ["truffle-contract-size"],
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    polygon: {
      provider: () => new HDWalletProvider(
        mnemonic, infura_endpoint_polygon
      ),
      from: owner, // Public wallet address
      network_id: 80001,   // rinkeby's id
      gas: 5500000,        // rinkeby has a lower block limit than mainnet
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
    rinkeby: {
      provider: () => new HDWalletProvider(
        mnemonic, infura_endpoint_rinkeby
      ),
      from: owner, // Public wallet address
      network_id: 4,       // rinkeby's id
      gas: 5500000,        // rinkeby has a lower block limit than mainnet
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.4",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,     // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
       optimizer: {
         enabled: true,
         runs: 1000
       },
      //  evmVersion: "byzantium"
      }
    }
  },
}