require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/69CE2zvvjK4e3jjFrlERQUsXiyWd-3Ll',
      accounts: ['283f8c39c3e77a1ce56df5586cf72080cacf8a425fb7427cec73b7125e018d29']
    }
  },

}