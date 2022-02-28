# Getting Started with This App

## Tool Prerequisites

You must have these tools installed
- NVM or NodeJS
- [Truffle](https://trufflesuite.com/docs/truffle/)
    > npm i truffle -g
- [Ganache](https://trufflesuite.com/ganache/index.html)
 - Personal Ethereum Blockchain
- [solidity](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity)
- [vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=styled-components.vscode-styled-components)

## Optional Prerquisites

Add these VS Code extensions for productivity, code highlighting and debugging: 

- [solidity-extended](https://marketplace.visualstudio.com/items?itemName=beaugunderson.solidity-extended)
- [solidity-debugger](https://marketplace.visualstudio.com/items?itemName=hosho.solidity-debugger)

## Start Branch

We used Create React App to setup a working React project with some styles and pre-existing components, the rest we will build from scratch!

Some of the command we have already run are:

```bash
npx create-react-app stablecoin-nft-ticket-workshop`
```

```bash
npm i polished styled-components
```

```bash
npm i @openzeppelin/contracts
```

Run `npm i && npm start` and ensure that you get a standard React Projects with no errors in the terminal or in the browser console.

## Start Here

1. We will start by initializing Truffle in our repository:

```bash
truffle init
```

This will add a config, a migrations contract, an actual migrations javascript file and a directory for tests:

```
├── truffle-config.js  
├── contracts  
│   └── Migrations.sol  
├── migrations  
│   └── 1_initial_migration.js  
├── test  
│   └── .gitkeep  
```

2. Next we will open up Ganache and create a New Workspace with the same name as our repo: `nft-tickets-workshop` and connect your project by selecting Add Project and navigating to the `truffle-config.js` file we just created in the root of our project. Finally click Save Workspace and we get get access to a local blockchain specific for our project.

![](./assets-readme/ganache-1.png)

3. In our `truffle-config.js` file we want to uncomment the following lines:

- lines 44 through 48 (change the port to: `7545` to match Ganache RPC server port)
- line 84 (ensure we have a fairly up to date version `0.8.11`)

4. We will use Truffle to create our Contract:

```bash
truffle create contract Foxcon2022
```

This will create inside of our `contracts` directory a file named: `Foxcon2022.sol` with some basic contract code.

5. We will test out one more Truffle command real quick and see that the contract we just added will compile (as it should)

```bash
truffle compile
```

Although you may see a warning in the terminal our contract did compile, we can resolve the warnings as we build out our contract.

6. We need to create a migrations file for this contract, so let's create a file inside of the `migrations` directory named: `2_setup_Foxcon2022.js` and add the following code:

```js
const Foxcon2022 = artifacts.require("Foxcon2022");

module.exports = function (deployer) {
  deployer.deploy(Foxcon2022);
};
```

7. Now we can run our Truffle Migrate command:

```bash
truffle migrate
```

And we will see some output in the terminal and if we look in our Ganache app, we will see two contracts:

![](./assets-readme/ganache-2.png)

