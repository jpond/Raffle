const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes').default;
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/0c4a4415fdb344258960845f24c907bd'));
const mongodb = require('mongodb').MongoClient;
//const contract = require('@truffle/contract');
//const artifacts = require('./build/contracts/Raffle.json');
const RAFFLE_CONFIG = require('./config');
//const ipfsClient = require('ipfs-http-client');
//const ipfs = ipfsClient('http://localhost:5001');


app.use(cors());
app.use(express.json());

//const raffle = new web3.eth.Contract(RAFFLE_CONFIG.RAFFLE_ABI, RAFFLE_CONFIG.RAFFLE_ADDRESS);

app.get('/', (req, res) => {
    res.status(200).json({
        raffles: [{bottle:"EHT 10 yr", date:"3/2/22", link:"/raffles/future/1"}, {bottle:"Weller 12 yr", date:"3/2/22", link:"/raffles/future/2"}],
        currentRaffle: {bottle: "EH Taylor Single Barrel", time:"6pm CT 3/2/22", link:"/raffles/current/2"}
    })
});


//For auctioning: Check ethereum wallet balance for each person at beginning of auction. Then we don't need to check balance with each new bet, which would take far too long. Just store their balance
//in a local database and use that to make sure they have the money they say they do, then at the end do an actual balance check and withdrawel. If they don't have the money, the next person
//in line gets it, etc.


/*
mongodb.connect('mongodb://127.0.0.1:27017/blockchain-node-api',
    {
    useUnifiedTopology: true,

    }, async (err, client) => {
        const db = client.db('Cluster0');
        const accounts = await web3.eth.getAccounts();
        const raffle = new web3.eth.Contract(RAFFLE_CONFIG.RAFFLE_ABI, RAFFLE_CONFIG.RAFFLE_ADDRESS);
        routes(app, db, accounts, raffle, ipfs);
        app.listen(process.env.PORT || 3001, () => {
            console.log('listening on port ' + (process.env.PORT || 3001));
        });
    }
);
*/
app.listen(process.env.PORT || 3001, () => {
    console.log("listening on " + process.env.PORT);
});
exports.web3 = web3;
exports.app = app;