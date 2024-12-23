const ItemSale = artifacts.require("../contracts/ItemSale.sol");

module.exports = function(deployer) {
  deployer.deploy(ItemSale);
};
