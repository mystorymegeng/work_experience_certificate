import { Express } from "express"
import { Collection, Db, ObjectId } from "mongodb"
import abiDecoder from "abi-decoder";

import { web3 } from "../server"

export const transactionController = (db: Db, app: Express, contract) => {
    let transactions: Collection<any>
    transactions = db.collection('transactions')
    
    app.get('/transactions', async (req, res) => {
        try {
            const tran = await contract.methods.getAllCer().call( { gas: 1000000 } )
            // const allTransaction = await transactions.find({}).toArray()
            res.json(tran)
        } catch (err) {
            res.status(500).json( {message: err} )
        }
    })

    app.get('/transaction/:hash', async (req, res) => {
        try {
            let input = req.params;
            let tran = await web3.eth.getTransaction(input.hash);
            const decode = abiDecoder.decodeMethod(tran.input)
            res.json(decode)
        } catch (err) {
            res.status(500).json( {message: err} )
        }
    })

    app.post('/transaction/careate', async (req, res) => {
        let input = req.body;
        try {
            const tran = await contract.methods.addCer( input.name, input.sername, input.dateOfBirth, input.company, 
                input.workFrom, input.workTo, input.position, input.description, ).send( { from: input.account, gas: 1000000 } )
            
            const data: any = {
                hash: tran.transactionHash,
                userId: new ObjectId(input.userId.toString()),
                for: input.name + ' ' + input.sername,
                company: input.company.toString(),
                createAt: new Date
            }
            const user = await transactions.insertOne(data);
            res.json(user)
        } catch (err) {
            res.status(500).json( {message: err} )
        }
    })

    app.post('/transaction/update', async (req, res) => {
        try {
            let input = req.body;
            const tran = await contract.methods.updateCer( input.name, input.sername, input.dateOfBirth, input.company, 
                input.workFrom, input.workTo, input.position, input.description, input.oldHash ).send( { from: input.account, gas: 1000000 } )

            const data: any = {
                hash: tran.transactionHash,
                userId: new ObjectId(input.userId.toString()),
                for: input.name + ' ' + input.sername,
                company: input.company.toString(),
                createAt: new Date
            }
            const user = await transactions.insertOne(data);
            res.json(user)
        } catch (err) {
            res.status(500).json( {message: err} )
        }
    })

    // app.get('/transaction/:index', async (req, res) => {
    //     let input = req.params;
    //     const tran = await contract.methods.getCer(input.index).call( { gas: 1000000 } )
    //     console.log(tran);
    //     // const allTransaction = await transactions.find({}).toArray()
    //     res.json(tran)
    // })
}