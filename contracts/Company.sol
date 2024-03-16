// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Company{

    struct NFT {
        string title;
        string description;
        string legalAgreementURI;
    }

    mapping(uint256 => NFT) public tokenMetadata;

    function setMetadata(uint256 tokenId, string memory title, string memory description, string memory legalAgreementURI) external {
        require(bytes(title).length > 0, "Title must not be empty");
        require(bytes(description).length > 0, "Description must not be empty");
        require(bytes(legalAgreementURI).length > 0, "Legal agreement URI must not be empty");
        
        NFT storage metadata = tokenMetadata[tokenId];
        metadata.title = title;
        metadata.description = description;
        metadata.legalAgreementURI = legalAgreementURI;
    }

    function getMetadata(uint256 tokenId) external view returns (string memory title, string memory description, string memory legalAgreementURI) {
        NFT storage metadata = tokenMetadata[tokenId];
        return (metadata.title, metadata.description, metadata.legalAgreementURI);
    }
}
