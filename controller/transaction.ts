import { Express } from "express"
import { Collection, Db, ObjectId } from "mongodb"
import abiDecoder from "abi-decoder";

import { web3 } from "../server"

export const transactionController = (db: Db, app: Express, contract) => {
    let transactions: Collection<any>
    transactions = db.collection('transactions')
    let users: Collection<any>
    users = db.collection('users')
    
    app.get('/transactions', async (req, res) => {
        try {
            // const tran = await contract.methods.getAllCer().call( { gas: 1000000 } )
            const allTransaction = await transactions.find({}).toArray()
            res.json(allTransaction)
        } catch (err) {
            res.status(500).json( {message: err} )
        }
    })

    app.get('/transaction/:hash', async (req, res) => {
        try {
            let input = req.params;
            let tran = await web3.eth.getTransaction(input.hash);
            const decode = abiDecoder.decodeMethod(tran.input)
            let dbTran = await transactions.findOne( {hash: input.hash} ) 
            let user = await users.findOne({_id: new ObjectId(dbTran.userId.toString())});
            let data = {};
            if (dbTran) {
                for ( let i of decode.params ) {
                    data[i.name] = i.value;
                }
                data['user'] = user.name+ " "+ user.sername;
                data['createAt'] = dbTran.createAt;
            }
            res.json(data)
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
            const transaction: any = await transactions.insertOne(data);
            const check = await transactions.findOne({ _id: new ObjectId(transaction._id.toString()) })
            res.json(check)
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
            const transaction: any = await transactions.insertOne(data);
            const check = await transactions.findOne({ _id: new ObjectId(transaction._id.toString()) });
            res.json(check)
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