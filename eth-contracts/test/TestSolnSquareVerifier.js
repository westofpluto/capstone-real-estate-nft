
// Test if an ERC721 token can be minted for contract - SolnSquareVerifier

const SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
const { proof, inputs } = require('../../zokrates/code/square/proof')

contract('TestSolnSquareVerifier', accounts => {
    describe('Test SolnSquareVerifier', function(){
        beforeEach(async function() {
            this.contract = await SolnSquareVerifier.new();
        });

        // Test if a new solution can be added for contract - SolnSquareVerifier
        it('new solution can be added', async function(){

            let _key = await this.contract.getKey.call(proof.a,proof.b,proof.c, inputs);

            await this.contract.addSolution(1,accounts[1], _key);
            let res=await this.contract.getSolution.call(_key);
            let tokenId=res[0];
            let solutionAddr=res[1];
            let storedKey=res[2];
            assert.equal(tokenId, 1, 'ERROR: tokenId is wrong');
            assert.equal(solutionAddr, accounts[1], 'ERROR: solutionAddr is wrong');
            assert.equal(storedKey, _key, 'ERROR: storedKey is wrong');
        });

        // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
        it('new token can be minted', async function() {
            let contract_owner = accounts[0];
            let res = this.contract.mintToken(accounts[2], 123, proof.a, proof.b,proof.c,inputs,{from: contract_owner});
            assert(res,true,"ERROR: could not mint token");
        });
    });
})
