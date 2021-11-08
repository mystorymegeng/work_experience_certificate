import { Express } from "express"
import { Collection, ObjectId } from "mongodb"

export class userController {
    users: Collection<Document>

    constructor(db, app: Express) {
        this.users = db.collection('users')

        app.get('/users', async (req, res) => {
            const allUser = await this.users.find({}).toArray()
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
            const user = await this.users.insertOne(data);
            res.json(user)
        })

        app.post('/login', async (req, res) => {
            const input = req.body
            const data: any = {
                username: input.username.toString(),
                password: input.password.toString(),
                company: input.company.toString(),
            }
            const user = await this.users.findOne(data)
            res.json(user)
        })
    }
}