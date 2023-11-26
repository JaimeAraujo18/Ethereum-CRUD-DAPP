var Persons = artifacts.require("./Persons.sol");

module.exports = function(deployer) {
  deployer.deploy(Persons);
};
