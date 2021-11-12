import { Express } from "express"
import { Collection, Db, ObjectId } from "mongodb"

export const userController = (db: Db, app: Express) => {
    let users: Collection<any>
    users = db.collection('users')

    app.get('/users', async (req, res) => {
        const allUser = await users.find({}).toArray()
        res.json(allUser)
    })

    app.post('/user', async (req, res) => {
        let input = req.body;
        const data: any = {
            account: input.account.toString(),
            username: input.username.toString(),
            password: input.password.toString(),
            company: input.company.toString(),
            createAt: new Date
        }
        const user = await users.insertOne(data);
        res.json(user)
    })

    app.post('/login', async (req, res) => {
        const input = req.body
        const data = {
            username: input.username.toString(),
            password: input.password.toString(),
            company: input.company.toString(),
        }
        const user = await users.findOne(data)
        res.json(user)
    })
}