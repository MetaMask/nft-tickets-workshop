const typedData = {
  domain: {
    // Defining the chain aka Rinkeby testnet or Ethereum Main Net
    chainId: 4,
    // Give a user friendly name to the specific contract you are signing for.
    name: "Ether Mail",
    // If name isn't enough add verifying contract to make sure you are establishing contracts with the proper entity
    verifyingContract: "0xC66450E959dbfA945B4D5C287A8Fa185F3610CDD",
    // Just let's you know the latest version. Definitely make sure the field name is correct.
    version: "1"
  },

  // Defining the message signing data content.
  message: {
    /*
     - Anything you want. Just a JSON Blob that encodes the data you want to send
     - No required fields
     - This is DApp Specific
     - Be as explicit as possible when building out the message schema.
    */
    contents: "I agree to this!",
    attachedMoneyInEth: 1.5,
    from: {
      name: "test",
      wallets: [
        "0x568820334111ba2a37611F9Ad70BD074295D44C5"
      ]
    },
    to: [
      {
        name: "httpJunkie",
        wallets: [
          "0xC66450E959dbfA945B4D5C287A8Fa185F3610CDD"
        ]
      }
    ]
  },
  // Refers to the keys of the *types* object below.
  primaryType: "Mail",
  types: {
    // TODO: Clarify if EIP712Domain refers to the domain the contract is hosted on
    EIP712Domain: [
      { name: "name", type: "string" },
      { name: "version", type: "string" },
      { name: "chainId", type: "uint256" },
      { name: "verifyingContract", type: "address" }
    ],
    // Not an EIP712Domain definition
    Group: [
      { name: "name", type: "string" },
      { name: "members", type: "Person[]" }
    ],
    // Refer to PrimaryType
    Mail: [
      { name: "from", type: "Person" },
      { name: "to", type: "Person[]" },
      { name: "contents", type: "string" }
    ],
    // Not an EIP712Domain definition
    Person: [
      { name: "name", type: "string" },
      { name: "wallets", type: "address[]" }
    ]
  }
};

export default typedData
