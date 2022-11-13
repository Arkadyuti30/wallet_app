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

  creditDebitAmount: (opts, cb) => {
    let {
      creditDebitData,
      walletId
    } = opts
    /***** Sample Credit/ Debit Data *****/
    /*
      { amount: 10, description: 'Recharge' }
    */
    // If amount is positive then it's credit
    // If amount is negative then it's debit

    if (!opts || !walletId || isNaN(creditDebitData.amount)) {
      sails.log.error(`Missing credit/ debit data or wallet id or credit/ debit amount is not a number credit/ debit data: ${JSON.stringify(creditDebitData)} walletId: ${walletId}`)
      return cb({
        status: 400
      })
    }

    /****** UPDATE WALLET & CREATE NEW TRANSACTION ******/
    Wallet.update({
      id: walletId
    }, {
      balance: (balance + creditDebitData.amount).toFixed(4) // correcting the updated balance to upto decimal places
    }).exec((errWalletUpdate) => {
      if (errWalletUpdate) {
        sails.log.error(`Error in updating wallet, id: ${walletId}`)
        return cb(errWalletUpdate)
      }

      let newTransaction = {
        walletId: foundWalletData.id,
        amount: creditDebitData.amount,
        balance: updatedBalance,
        description: creditDebitData.description,
        date: new Date()
        type: (creditDebitData.amount > 0) ? "CREDIT" : "DEBIT"
      }

      // Create new transaction
      Transaction.create(newTransaction).fetch().exec((errTran, createdTransaction) => {
        if (errTran) {
          sails.log.error(`Error creating & fetching wallet transaction for wallet id: ${createdWalletData.id}`)
          return cb(errTran)
        }
        let response = {
          balance: updatedBalance,
          transactionId: createdTransaction.id
        }

        return cb(null, response)
      })
    })
  }
};