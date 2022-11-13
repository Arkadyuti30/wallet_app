/**
 * TransactionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    fetchTransactions: (req, res) => {
        const walletId = req.param('walletId')
        const skip = req.param('skip')
        const limit = req.param('limit')

        if (!walletId) {
            sails.log.error(`Missing walletId while fething transactions. walletId: ${walletId}`)
            return res.badRequest()
        }

        Transaction.find({walletId}).skip(skip).limit(limit).exec((err, transactions) => {
            if (err) {
                sails.log.error(`Error in finding transactions for walletId: ${walletId}`)
                return res.negotiate(err)
            }
            return res.json(transactions)
        })
    }
};