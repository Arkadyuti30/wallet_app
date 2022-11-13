/**
 * Wallet.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    balance: {
      type: 'number',
      required: true
    },
    date: {
      type: 'date',
      required: true
    }
  },

  initWallet: (walletData, cb) => {
    /* 
      Sample Wallet Data
      { balance: 20, name: ‘Hello world’ }
    */

    if (!walletData) {
      sails.log.error(`No wallet data found! Wallet data: ${walletData}`)
      return cb({
        status: 400
      })
    }
    Wallet.create(walletData).fetch().exec((err, createdWalletData) => {
      if (err) {
        sails.log.error(`Error creating & fetching wallet for wallet data ${JSON.stringify(walletData)}`)
        return cb(err)
      }

      let transactionDetails = {
        walletId: createdWalletData.id,
        amount: createdWalletData.balance,
        balance: createdWalletData.balance,
        description: "Wallet initialisation",
        date: createdWalletData.date,
        type: "CREDIT"
      }

      // Creating transaction for wallet initialisation
      Transaction.create(transactionDetails).fetch().exec((errTran, createdTransaction) => {
        if (errTran) {
          sails.log.error(`Error creating & fetching wallet transaction for wallet id: ${createdWalletData.id}`)
          return cb(errTran)
        }
        let response = {
          id: createdWalletData.id,
          balance: createdWalletData.balance,
          transactionId: createdTransaction.id,
          name: createdWalletData.name,
          date: createdWalletData.date
        }
        return cb(null, response)
      })
    })
  }
};

