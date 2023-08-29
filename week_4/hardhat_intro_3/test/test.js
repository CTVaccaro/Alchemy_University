const {expect, assert} = require('chai')

describe("TestModifyVariable", function () {
    it("should change Data to Leet", async function () {
        const ModifyVariable = await ethers.getContractFactory("ModifyVariable")

        const contract = await ModifyVariable.deploy("1234")

        await contract.deployed()

        await contract.modifyToLeet()

        const newData = await contract.data()

        assert.equal(newData.toString(), "Leet")
    })
})