const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');

describe('Faucet', function () {
    async function deployContractAndSetVariables() {
        const Faucet = await ethers.getContractFactory('Faucet')
        const faucet = await Faucet.deploy()

        const [owner] = await ethers.getSigners()

        console.log('Signer 1 address: ', owner.address)

        let withdrawAmount = ethers.utils.parseUnits(".01", "ether")
        return {faucet, owner, withdrawAmount};
    }
 
    it('should deploy and set the owner correctly', async function () {
        const {faucet, owner} = await loadFixture(deployContractAndSetVariables)
        expect(await faucet.owner()).to.equal(owner.address)
    })
    it('should not allow withdrawals bigger than 0.1 ETH', async function () {
        const {faucet, withdrawAmount} = await loadFixture(deployContractAndSetVariables)
        await expect(faucet.withdraw(withdrawAmount)).to.be.reverted
    })
    it('should allow only the owner to execute', async function () {
        const {faucet, owner} = await loadFixture(deployContractAndSetVariables)
        await expect(faucet.withdrawAll()).not.to.be.reverted
    })
})