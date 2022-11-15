# Wallet App

This app has been hosted on <b>Heroku</b>. [You can access this app publicly here](https://warm-forest-96436.herokuapp.com/) 

### What is Wallet App?
This is a wallet app with the following features:
- Setup wallet
- Credit / Debit transactions
- Fetching transactions on wallet
- Get wallet details

### API endpoints in this project
This is a wallet app with the following features:
#### Setup wallet - /setup
   - Sample request: POST /setup
   - Request body: 
     ```javascript 
     {
      balance: 111, 
      name: "Chiku's wallet"
     }
     ```
   - Response: 
     ```javascript
     {
      "id":"6373a26476fbca3e68317404",
      "balance":111,
      "transactionId":"6373a26676fbca3e68317405",
      "name":"Chiku's wallet",
      "date":"2022-11-15T14:29:56.714Z"
     }
     ```
#### Get wallet details - /wallet/:id
Note: here id is a param which is the wallet id
- Sample request: GET /wallet/6373a26476fbca3e68317404
- Response: 
     ```javascript
     {
      "createdAt": 1668522596715,
      "updatedAt": 1668522596715,
      "id": "6373a26476fbca3e68317404",
      "date": "2022-11-15T14:29:56.714Z",
      "name": "Chiku's wallet",
      "balance": 111
     }
     ```
#### Credit / Debit transactions - /transact/:walletId
- Sample request: POST /transact/6373a26476fbca3e68317404
- Request body: 
     ```javascript 
     {
      amount: 100, 
      name: "recharge"
     }
     ```
 - Response: 
     ```javascript
     {
      "balance": "211.0000",
      "transactionId": "6373a7b5cdbbbe0004058c79"
     }
     ```
#### Fetching transactions on wallet - /transactions?walletId={walletId}&skip={skip}&limit={limit}
Note: skip is the no. of transactions it'll skip from the starting transaction. limit stands for the no. of transactions it'll fetch. If skip & limit are missing, it'll fetch all transactions for the particular wallet
#### Example 1: Fetching all transactions
- Sample request: GET /transactions?walletId=6373a26476fbca3e68317404
- Response: 
     ```javascript
     [
      {
          "description": "Wallet initialisation",
          "createdAt": 1668522598348,
          "updatedAt": 1668522598348,
          "id": "6373a26676fbca3e68317405",
          "date": "2022-11-15T14:29:56.714Z",
          "amount": 111,
          "balance": 111,
          "type": "CREDIT",
          "walletId": "6373a26476fbca3e68317404"
      },
      {
          "description": "recharge",
          "createdAt": 1668523957608,
          "updatedAt": 1668523957608,
          "id": "6373a7b5cdbbbe0004058c79",
          "date": "2022-11-15T14:52:37.608Z",
          "amount": 100,
          "balance": 211,
          "type": "CREDIT",
          "walletId": "6373a26476fbca3e68317404"
      },
      {
          "description": "chips",
          "createdAt": 1668524470740,
          "updatedAt": 1668524470740,
          "id": "6373a9b6cdbbbe0004058c7a",
          "date": "2022-11-15T15:01:10.740Z",
          "amount": -10,
          "balance": 201,
          "type": "DEBIT",
          "walletId": "6373a26476fbca3e68317404"
      },
      {
          "description": "gift",
          "createdAt": 1668524493487,
          "updatedAt": 1668524493487,
          "id": "6373a9cdcdbbbe0004058c7b",
          "date": "2022-11-15T15:01:33.487Z",
          "amount": 100,
          "balance": 301,
          "type": "CREDIT",
          "walletId": "6373a26476fbca3e68317404"
        }
     ]
     ```
#### Example 2 - skip=1, limit=2. Will skip the first transaction (wallet initialisation) & show 2 transactions from then onward
- Sample request: GET /transactions?walletId=6373a26476fbca3e68317404
- Response:
     ```javascript
     [
        {
          "description": "recharge",
          "createdAt": 1668523957608,
          "updatedAt": 1668523957608,
          "id": "6373a7b5cdbbbe0004058c79",
          "date": "2022-11-15T14:52:37.608Z",
          "amount": 100,
          "balance": 211,
          "type": "CREDIT",
          "walletId": "6373a26476fbca3e68317404"
      },
      {
          "description": "chips",
          "createdAt": 1668524470740,
          "updatedAt": 1668524470740,
          "id": "6373a9b6cdbbbe0004058c7a",
          "date": "2022-11-15T15:01:10.740Z",
          "amount": -10,
          "balance": 201,
          "type": "DEBIT",
          "walletId": "6373a26476fbca3e68317404"
      }
     ]
     ```
Note: The response is without the first transaction (wallet initialisation) & doesn't have the last transaction as we have set the limit to 2

### Database
- This project uses MongoDB Atlas as the database.
- There are only 2 collections for this project:
  - `wallet` - contains all wallet documents
  - `transaction` - contains all transaction documents
- Since, we fetch `wallet` by its id so the default indexing works, ie, id of the document
- For `transaction` an index has been created for walletId as we fetch transactions by the wallet id. This makes the fetching of the transactions more efficient & faster in case of huge no. of transaction documents
- Sample wallet document
  ```javascript
    {
      _id: ObjectId("63738fc4ca2eec302a517098"),
      balance: 864.9988,
      name: 'My shopping wallet',
      date: '2022-11-15T13:10:28.852Z',
      createdAt: 1668517828852,
      updatedAt: 1668520519862
    }
  ```
- Sample transaction document
  ```javascript
    {
      _id: ObjectId("6373965e77d79d000487f4df"),
      walletId: ObjectId("6373963f77d79d000487f4dd"),
      amount: 111,
      balance: 555,
      description: 'food',
      date: '2022-11-15T13:38:38.435Z',
      type: 'CREDIT',
      createdAt: 1668519518435,
      updatedAt: 1668519518435
    }
  ```

### How to setup this project to run it locally
1. Clone this github repo on your local
2. You must have node & npm installed (if not, follow any tutorial to install the same)
3. Go to the repo folder on your local and run `npm i` - this will install all the dependencies required for this project
4. After this, run `sails lift`
5. Go to http://localhost:1337/ - this is our Wallet App!


a [Sails v1](https://sailsjs.com) application


### Links

+ [Sails framework documentation](https://sailsjs.com/get-started)
+ [Version notes / upgrading](https://sailsjs.com/documentation/upgrading)
+ [Deployment tips](https://sailsjs.com/documentation/concepts/deployment)
+ [Community support options](https://sailsjs.com/support)
+ [Professional / enterprise options](https://sailsjs.com/enterprise)


### Version info

This app was originally generated on Sun Nov 13 2022 23:38:38 GMT+0530 (India Standard Time) using Sails v1.5.3.

<!-- Internally, Sails used [`sails-generate@2.0.7`](https://github.com/balderdashy/sails-generate/tree/v2.0.7/lib/core-generators/new). -->



<!--
Note:  Generators are usually run using the globally-installed `sails` CLI (command-line interface).  This CLI version is _environment-specific_ rather than app-specific, thus over time, as a project's dependencies are upgraded or the project is worked on by different developers on different computers using different versions of Node.js, the Sails dependency in its package.json file may differ from the globally-installed Sails CLI release it was originally generated with.  (Be sure to always check out the relevant [upgrading guides](https://sailsjs.com/upgrading) before upgrading the version of Sails used by your app.  If you're stuck, [get help here](https://sailsjs.com/support).)
-->

