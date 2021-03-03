const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const Certificate = require('./build/Certificate.json');

const provider = new HDWalletProvider(
  'frame apart post kick armed refuse limb armed annual jaguar apart cliff' ,
  'https://rinkeby.infura.io/v3/91ae8105018647e7a5302040d40ede18'
  );

  const address = '0x0E3BA9eA5D221B395EC6957E0Eb59C08573b56E3';
  const abi =[
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_uid",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_hash",
          "type": "string"
        }
      ],
      "name": "addData",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_uid",
          "type": "string"
        }
      ],
      "name": "viewData",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
  const web3 = new Web3(provider);

module.exports = new web3.eth.Contract(abi, address)