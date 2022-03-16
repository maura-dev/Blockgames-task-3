//SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
//specifies the compiletr version

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
//importing the ERC721 contract from openzeppelin
import "@openzeppelin/contracts/utils/Counters.sol";
//importing the counter to increment my token id
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFT is ERC721URIStorage {
    //extending the properties of the ERC721URIStorage contract to my NFT contract

    using Counters for Counters.Counter;
    Counters.Counter private tokenId;

    constructor() ERC721("MaureenNFT", "MNFT") {}
    //instantiates the constructor fxn of erc721 contract by creating name and symbol for my nft

    function mintNFT (address mintTo, string memory tokenURI) public returns (uint256) {
        tokenId.increment(); //increments base token ID

        uint256 newTokenId = tokenId.current(); 
        //sets the current token id to the variable newTokenId

        _mint(mintTo, newTokenId);
        //mints NFT to the 'mintTo' address with an NFT id of 'newTokenId

        _setTokenURI(newTokenId, tokenURI);
        //sets token URI with the new token id and token URI

        return newTokenId;
    }
  
}