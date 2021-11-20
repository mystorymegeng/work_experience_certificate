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
// const web3Uri = "https://data-seed-prebsc-1-s1.binance.org:8545/" // test
const contracAddress = "0xC4f14308E5a1ED24A44FbAACC44c45e8217E5976";
// const contracAddress =  "0xa999ABe396Bb301bA201410d378310c887884508"; // test-net

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
    // const addAccount = web3.eth.accounts.privateKeyToAccount('0x' + "9d0315f3afc52ca26cb3e2517cf1001c0e250164833dd6d521d31b15ea1f0b5a");
    // web3.eth.accounts.wallet.add(addAccount);
    // web3.eth.defaultAccount = addAccount.address;
    const CertificateABI: any = CertificateJson.abi;
    abiDecoder.addABI(CertificateABI);
    const contract = new web3.eth.Contract(CertificateABI, contracAddress);
    let account = await web3.eth.getAccounts();
    baseAccount = account[0];
    // baseAccount = "0x657Bd77683b7744867df23fDEaC8447FF9338676";
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