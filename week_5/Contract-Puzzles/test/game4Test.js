const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game4', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game4');
    const game = await Game.deploy();

    const signer_1 = ethers.provider.getSigner(0);

    return { game, signer_1 };
  }
  it('should be a winner', async function () {
    const { game, signer_1 } = await loadFixture(deployContractAndSetVariables);

    const address_1 = await signer_1.getAddress(); console.log(address_1)
    // nested mappings are rough :}
    await game.write(address_1)

    await game.win(address_1);

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
