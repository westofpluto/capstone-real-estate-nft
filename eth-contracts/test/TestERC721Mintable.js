var ERC721Mintable = artifacts.require('RealEstateTitleToken');

contract('TestERC721Mintable', accounts => {

    const contract_owner = accounts[0];

    let tokenId=0;
    let numTokens=0;

    const URI = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"

    describe('match erc721 spec', function () {
        let reverted=false;
        beforeEach(async function () { 
            tokenId=0;
            numTokens=0;
            this.contract = await ERC721Mintable.new({from: contract_owner});

            // mint multiple tokens, 2 each to 5 accounts
            for (let acctIdx=1;acctIdx<=5;acctIdx++) {
                for (let idx=1; idx<=2;idx++) {
                    reverted=false;
                    numTokens++;
                    tokenId=100+numTokens;   // the 100 is arbitrary
                    try {
                        await this.contract.mint(accounts[acctIdx],tokenId,{from: contract_owner});
                    } catch(error) {
                        reverted=true;
                    }
                    assert.equal(reverted,false,"ERROR: could not mint token ");
                    //let tokenOwner = await this.contract.ownerOf(tokenId);
                    //console.log("Owner of token "+tokenId+" is "+tokenOwner);
                }
            }
        })

        it('should return total supply', async function () { 
           let supply = await this.contract.totalSupply.call(); 
           assert.equal(numTokens,supply,"ERROR: numTokens is different from totalSupply");
        })

        it('should get token balance', async function () { 
            for (let acctIdx=1;acctIdx<=5;acctIdx++) {
               let tokensForAddr = await this.contract.balanceOf.call(accounts[acctIdx]);
               assert.equal(tokensForAddr,2,"ERROR: tokensForAddr should be 2");
            }
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/105
        // NOTE: we run this check for an existing (minted) token
        it('should return token uri', async function () { 
            try {
                let uri = await this.contract.tokenURI.call(105);
                let expectedURI = URI + "105";
                assert.equal(uri,expectedURI,`ERROR: the URI for token 105 ${uri} is not what we expected: ${expectedURI}`);
            } catch(error) {
                console.log(error);
            }
        })

        it('should transfer token from one owner to another', async function () { 
            //
            // token 101 is owned by accounts[1]
            // Let's transfer it to accounts[4]
            //
            tokenId=101;
            let tokenOwner = await this.contract.ownerOf(tokenId);
            assert.equal(tokenOwner,accounts[1],"ERROR: accounts[1] does not own token 101");

            reverted=false;
            try {
                await this.contract.transferFrom(accounts[1],accounts[4],101,{from: accounts[1]});
            } catch(error) {
                reverted=true;
            }
            assert.equal(reverted,false,"ERROR: could not transfer token 101 from account 1 to account 4");
             
            //
            // token 103 is owned by accounts[2]
            // Let's try to transfer it from accounts[3] to accounts[4], which should fail
            //
            reverted=false;
            try {
                await this.contract.transferFrom(accounts[1],accounts[4],101,{from: accounts[3]});
            } catch(error) {
                reverted=true;
            }
            assert.equal(reverted,true,"ERROR: should fail when trying to transfer token 103 from account 3 to account 4");
             
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721Mintable.new({from: contract_owner});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            reverted=false;
            let ret=false;
            // try to mint new token from arbitrary account (3), should fail
            try {
                ret = await this.contract.mint(accounts[5], 199, {from: accounts[3]});
            } catch(error) {
                reverted=true;
            }        
            assert.equal(reverted,true,"ERROR: should fail when trying to mint token from non owner account");
        })

        it('should return contract owner', async function () { 
            let owner = await this.contract.getOwner.call();
            assert.equal(owner, contract_owner, "ERROR: Contract owner should be contract_owner = accounts[0]") ;
        })

    });
})
