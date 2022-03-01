// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Foxcon2022 is ERC721, ERC721URIStorage {
    constructor() ERC721("Foxcon2022", "FXC22") {
      // _private method
      // (to: who owns it?, tokenId: what token is owned?)
      _createTicket(msg.sender, 1, "QmcriZCeovxW61mYY6hNfYX1bmLh9gFUD294jhqUKkAUrk");
      _createTicket(msg.sender, 2, "QmR84E5VLg8CuYyky6ufomShta3yaJTmbhfzArG7vAdvS6");
      _createTicket(msg.sender, 3, "QmWUcWph126BHY6yV9hM8fFtdeitVbzqAihe2yZzMbeSvK");
      // ^ generates 3 token NFTs that we can sell as tickets
    }

    function _createTicket(address to, uint id, string memory url) private returns(bool) {
      _safeMint(to, id);
      _setTokenURI(id, url);
      return true;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://ipfs.io/ipfs";
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}