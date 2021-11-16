import { Express } from "express"
import { Collection, Db, ObjectId } from "mongodb"
import { baseAccount } from "../server"

export const userController = (db: Db, app: Express, contract) => {
    let users: Collection<any>
    users = db.collection('users')

    app.get('/users', async (req, res) => {
        const allUser = await users.find({}).toArray()
        res.json(allUser)
    })

    app.post('/user', async (req, res) => {
        try {
            let input = req.body;
            const data: any = {
                account: input.account.toString(),
                username: input.username.toString(),
                password: input.password.toString(),
                company: input.company.toString(),
                name: input.name.toString(),
                sername: input.sername.toString(),
                createAt: new Date
            }

            const check = await users.findOne( {account: data.account} )
            if ( check ) {
                res.status(500).json({message: "already exist account: " + data.account})
            } else {
                await contract.methods.addUser( data.account, data.company ).send( { from: baseAccount } );
                const user = await users.insertOne(data);
                res.json(user)
            }
        } catch (err) {
            res.status(500).json( {message: err} )
        }
    })

    app.delete('/user/:account', async (req, res) => {
        try {
            let input = req.params;
            await contract.methods.deleteUser( input.account ).send( { from: baseAccount } )
            await users.deleteOne({account: input.account})
            res.json({message: "deleted account " + input.account});
        } catch (err) {
            res.status(500).json( {message: err} )
        }
    })

    app.post('/login', async (req, res) => {
        const input = req.body
        const data = {
            username: input.username.toString(),
            password: input.password.toString(),
            company: input.company.toString(),
        }
        const user = await users.findOne(data)
        if (user) {
            res.json({ auth: true });
        } else {
            res.json({ auth: false });
        }
    })
}