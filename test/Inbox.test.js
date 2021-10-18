const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');
const INIT_STRING = 'Hi there!';

let accounts;
let inbox;

beforeEach(async ()=>{
  accounts = await web3.eth.getAccounts();

  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments: [INIT_STRING]})
    .send({from: accounts[0], gas: '1000000'});
});

describe('Inbox contract', () => {
  it('Contract deployed', () => {
    assert.ok(inbox.options.address);
  });

  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, INIT_STRING);
  });

  it('can modify the message', async () => {
    await inbox.methods.setMessage('Bye there!').send({from: accounts[0]});

    const message = await inbox.methods.message().call();
    assert.equal(message, 'Bye there!');
  });
})