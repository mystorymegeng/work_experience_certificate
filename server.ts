import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import Web3 from "web3";
import abiDecoder from "abi-decoder";

import { transactionController } from "./controller/transaction";
import { userController } from "./controller/user";

import CertificateJson from "./build/contracts/Certificate.json";

const PORT = 3000;
const HOST = '0.0.0.0'

const uri = "mongodb://Linode-admin:Linode-password@172.17.0.2:27017/"
const web3Uri = "ws://172.17.0.3:8545"
// const uri = "mongodb://Linode-admin:Linode-password@139.162.54.90:27017/"
// const web3Uri = "ws://139.162.54.90:8545"
const contracAddress = "0x38Aac2dFF5f06ef832E6e3dD72c81e2907F51251"
export var baseAccount = "";
export var web3: Web3;
// export var abiDecode: any;


const initDB = async () => {
    const client = new MongoClient(uri)
    const connect = await client.connect();
    return connect;
}

const initWeb3 = async () => {
    web3 = new Web3(web3Uri);
    const CertificateABI: any = CertificateJson.abi;
    abiDecoder.addABI(CertificateABI);
    const contract = new web3.eth.Contract(CertificateABI, contracAddress);
    let account = await web3.eth.getAccounts();
    baseAccount = account[0];
    return contract
}

const initApp = (connect: MongoClient, contract) => {
    const db = connect.db("certificate")
    const app = express()
    app.use(cors({
        origin: '*'
    }));
    app.use(express.json())

    app.listen(PORT, HOST)

    app.get('/', (req, res) => {
        res.send('Hello remote world!\n')
    })
    
    userController(db, app, contract)
    transactionController(db, app, contract)

    console.log(`Running on http://${HOST}:${PORT}`)
}

initDB().then( connect => {
    initWeb3().then( contract => {
        initApp(connect, contract)
    })
})