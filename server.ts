import * as express from "express"
import { MongoClient } from "mongodb"
import { transactionController } from "./controller/transaction";
import { userController } from "./controller/user";

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

    app.get('/', (req, res) => {
        res.send('Hello remote world!\n')
    })
    
    userController(db, app)
    transactionController(db, app)

    console.log(`Running on http://${HOST}:${PORT}`)
}

initDB().then( connect => {
    initApp(connect)
} )