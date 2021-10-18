const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider('icon tackle check sibling frame security bicycle electric cruise sample dynamic robot','https://rinkeby.infura.io/v3/52c5d68de81b4048a8aa3335eb1f74d0');

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attemping to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments: ['Hi Rinkeby!']})
    .send({gas:'1000000', from: accounts[0], gasPrice: '5000000000'});

  console.log('Contract deployed to ', result.options.address);
};

deploy();
