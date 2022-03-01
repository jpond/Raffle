const raffle = artifacts.require('Raffle');

module.exports = function(deployer) {
    deployer.deploy(raffle, 5);
}