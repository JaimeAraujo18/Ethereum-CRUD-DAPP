var Logs = artifacts.require("./Logs.sol");

module.exports = function (deployer) {
    deployer.deploy(Logs);
};
