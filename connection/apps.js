const contract = require('truffle-contract');

const CertificateJson = require('../build/contracts/Certificate.json');
var Certificate = contract(CertificateJson);

export const contract = () => {
    const start = () => {
        console.log('mystoryme');
    }
}

// module.exports = {
//   start: function(callback) {
//     var self = this;

//     Certificate.setProvider(self.web3.currentProvider);

//     // Get the initial account balance so it can be displayed.
//     self.web3.eth.getAccounts(function(err, accs) {
//       if (err != null) {
//         console.log("There was an error fetching your accounts.");
//         return;
//       }

//       if (accs.length == 0) {
//         console.log("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
//         return;
//       }
//       self.accounts = accs;
//       self.account = self.accounts[2];

//       callback(self.accounts);
//     });
//   },
// //   addUser: function(account, company, callback) {
// //     var self = this;
// //     Certificate.setProvider(self.web3.currentProvider);
// //     var cer;
// //     Certificate.deployed().then(function(instance) {
// //         cer = instance;
// //         return cer.addUser(account, company, {from: sender});
// //     }).then();
// //   }
// //   refreshBalance: function(account, callback) {
// //     var self = this;

// //     // Bootstrap the MetaCoin abstraction for Use.
// //     MetaCoin.setProvider(self.web3.currentProvider);

// //     var meta;
// //     MetaCoin.deployed().then(function(instance) {
// //       meta = instance;
// //       return meta.getBalance.call(account, {from: account});
// //     }).then(function(value) {
// //         callback(value.valueOf());
// //     }).catch(function(e) {
// //         console.log(e);
// //         callback("Error 404");
// //     });
// //   },
// //   sendCoin: function(amount, sender, receiver, callback) {
// //     var self = this;

// //     // Bootstrap the MetaCoin abstraction for Use.
// //     MetaCoin.setProvider(self.web3.currentProvider);

// //     var meta;
// //     MetaCoin.deployed().then(function(instance) {
// //       meta = instance;
// //       return meta.sendCoin(receiver, amount, {from: sender});
// //     }).then(function() {
// //       self.refreshBalance(sender, function (answer) {
// //         callback(answer);
// //       });
// //     }).catch(function(e) {
// //       console.log(e);
// //       callback("ERROR 404");
// //     });
// //   }
// }
