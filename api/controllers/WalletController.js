/**
 * WalletController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    setupWallet: (req, res) => {
        if (!req.body) {
            sails.log.error(`Missing body! Body ${req.body}`)
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
    }
};

