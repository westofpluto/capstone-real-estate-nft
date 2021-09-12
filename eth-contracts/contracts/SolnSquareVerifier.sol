pragma solidity >=0.4.21 <0.6.0;

// define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import "./ERC721Mintable.sol";
import "./verifier.sol";

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is Verifier, RealEstateTitleToken {

    // define a solutions struct that can hold an index & an address
    struct Solution {
        uint256 tokenId;
        address solutionAddr;
        bytes32 key;    // index
    }

    // define an array of the above struct
    Solution [] solutions;

    // define a mapping to store unique solutions submitted
    mapping(bytes32 => Solution) private uniqueSolutions;


    // Create an event to emit when a solution is added
    event SolutionAdded(uint256 tokenId, address solutionAddr, bytes32 key); 

    function addSolution(uint256 _tokenId, address _solutionAddr, bytes32 _key) external {
        Solution memory _solution = Solution({
            tokenId: _tokenId, 
            solutionAddr: _solutionAddr, 
            key: _key
        });
        solutions.push(_solution);
        uniqueSolutions[_key] = _solution;
        emit SolutionAdded(_tokenId,_solutionAddr,_key);
    }

    function getKey(uint[2] memory a, uint[2][2] memory b, uint[2] memory c, uint[2] memory input) public pure
        returns (bytes32)
    {
        return keccak256(abi.encodePacked(a, b, c, input));
    }

    function getSolution(bytes32 _key) external view returns (uint256 tokenId, address addr, bytes32 thekey) {
        tokenId=uniqueSolutions[_key].tokenId;
        addr=uniqueSolutions[_key].solutionAddr;
        thekey=uniqueSolutions[_key].key;
        return (tokenId,addr,thekey);
    }

    // Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly

    function mintToken(address _to, uint256 _tokenId, uint[2] memory a, uint[2][2] memory b, uint[2] memory c, uint[2] memory input) public 
        returns (bool) 
    {
        bytes32 _key = keccak256(abi.encodePacked(a, b, c, input));
        require(uniqueSolutions[_key].solutionAddr == address(0), "Solution has already been used");
        require(verifyTx(a, b, c, input), "Solution is not validated");
        this.addSolution(_tokenId, _to, _key);
        return super.mint(_to,_tokenId);
    }
}

  


























