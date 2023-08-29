const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();
    const signer_1 = ethers.provider.getSigner(0);

    return { game, signer_1 };
  }
  it('should be a winner', async function () {
    const { game, signer_1 } = await loadFixture(deployContractAndSetVariables);
    var found = false
    while(!found) {
      let wallet = ethers.Wallet.createRandom()
      if(wallet.address.substring(2,4) == '00'){
        found = true
        wallet = wallet.connect(ethers.provider) 
        await signer_1.sendTransaction({to: wallet.getAddress(), value: ethers.utils.parseEther('0.1')})
        await game.connect(wallet).win();
      }
    }
    // good luck

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
