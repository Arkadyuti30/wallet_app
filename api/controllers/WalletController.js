/**
 * WalletController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    setupWallet: (req, res) => {
        if (!req.body) {
            sails.log.error(`Error in WalletController.setupWallet. Missing request body! Body ${req.body}`)
            return res.badRequest()
        }

        /***** Sample Body *****/
        /* 
            { balance: 20, name: ‘Hello world’ }
        */

        var walletData = req.body
        walletData.date = new Date()

        Wallet.initWallet(walletData, (err, createdWalletDetails) => {
            if (err) {
                sails.log.error(`Error creating wallet for wallet name ${req.body.name}`)
                return res.negotiate(err)
            }
            return res.json(createdWalletDetails)
        })
    },

    creditDebitAmount: (req, res) => {
        const walletId = req.param('walletId')

        if (!req.body || !walletId) {
            sails.log.error(`Error in WalletController.creditDebitAmount. Missing credit/ debit details or wallet id. Wallet Id: ${walletId} Credit/ debit details: ${JSON.stringify(req.body)}`)
            res.badRequest()
        }

        Wallet.creditDebitAmount({creditDebitData: req.body, walletId}, (err, response) => {
            if (err) {
                sails.log.error(`Error WalletController.creditDebitAmount. Error: ${JSON.stringify(err)}`)
                res.negotiate(err)
            }
            res.json(response)
        })
    },

    getWalletDetails: (req, res) => {
        const walletId = req.param('id')

        if (!walletId) {
            sails.log.error(`Missing wallet id. Wallet Id: ${walletId} Credit/ debit details: ${JSON.stringify(req.body)}`)
            res.badRequest()
        }

        Wallet.findOne({id: walletId}).exec((err, foundWallet) => {
            if (err) {
                sails.log.error(`Error WalletController.getWalletDetails while finding wallet. Error: ${JSON.stringify(err)}`)
                res.negotiate(err)
            }
            return res.json(foundWallet)
        })
    }
};

