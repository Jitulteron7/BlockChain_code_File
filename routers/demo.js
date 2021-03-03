const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const factory = require('../Ethereum/certificate') ;

const provider = new HDWalletProvider(
    'frame apart post kick armed refuse limb armed annual jaguar apart cliff' ,
    'https://rinkeby.infura.io/v3/1ec6558c6dba4a9db1ab5f5b647d9a60'
    );
    
    const web3 = new Web3(provider);
    
    const deploy = async () => {

        try{
            const accounts = await web3.eth.getAccounts();
            console.log('account address ', accounts[0]);

            let hh = await factory.methods.addData(
                '001',
                'hash'
              ).send({gas:'1000000' , from: accounts[0]}).on('transactionHash', function(hash){
                console.log(hash); });
              console.log(hh);

        } catch(e){
            console.log(e);
        }
      };

      deploy()