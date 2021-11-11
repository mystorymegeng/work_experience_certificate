import { Express } from "express"
import { Collection, ObjectId } from "mongodb"

export const transactionController = (db, app: Express) => {
    let transactions: Collection<Document>
    transactions = db.collection('transactions')
    
    app.get('/transactions', async (req, res) => {
        const allTransaction = await transactions.find({}).toArray()
        res.json(allTransaction)
    })

    app.post('/transaction', async (req, res) => {
        let input = req.body;
        const data: any = {
            hash: input.hash.toString(),
            userId: new ObjectId(input.userId.toString()),
            for: input.for.toString(),
            company: input.company.toString(),
            createAt: new Date
        }
        const user = await transactions.insertOne(data);
        res.json(user)
    })
}