import express from "express";
import { MongoClient } from "mongodb";
import Web3 from "web3";

import { transactionController } from "./controller/transaction";
import { userController } from "./controller/user";

import Certificate from "./build/contracts/Certificate.json";

import * as TruffleContract from "@truffle/contract";
// import * as smart from "./connection/app";

// const truffle_connect = require('./connection/app.js');
// import { contract } from "./connection/app";

let web3 = new Web3('ws://172.29.176.1:7545');
web3.eth.getAccounts().then(console.log);

const PORT = 3000;
const HOST = '0.0.0.0'

const uri = "mongodb://localhost:27017/certificate"


const initDB = async () => {
    const client = new MongoClient(uri)
    const connect = await client.connect();
    return connect;
}

const initApp = (connect: MongoClient) => {
    const db = connect.db("certificate")
    const app = express()
    app.use(express.json())

    app.listen(PORT, HOST)

    // smart.read();

    app.get('/', (req, res) => {
        // contract.start(function (answer) {
        //     res.send(answer);
        // })
        res.send('Hello remote world!\n')
    })
    
    userController(db, app)
    transactionController(db, app)

    console.log(`Running on http://${HOST}:${PORT}`)
}

initDB().then( connect => {
    initApp(connect)
} )