/**
 * Transaction.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    walletId: {
      model: 'wallet',
      required: true
    },
    amount: {
      type: 'number',
      required: true
    },
    balance: {
      type: 'number',
      required: true
    },
    date: {
      type: 'date',
      required: true
    },
    type: {
      type: 'string',
      required: true
    }
  },

};

