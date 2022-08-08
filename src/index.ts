import mongoose, { Schema } from "mongoose"
import 'dotenv/config' 

import app from "./app"

const username = process.env.MONGODB_USER
const password = process.env.MONGODB_PASS
const cluster = process.env.MONGODB_CLUSTER
const database = process.env.MONGODB_DATABASE

let uri = `mongodb+srv://${username}:${password}@${cluster}/${database}?retryWrites=true&w=majority`;

app.listen(app.get('port'), () => console.log(`app is up and running in port ${ app.get('port') }`))

// mongoose.connect(uri)
// .then(() => {
//     app.listen(app.get('port'), () => console.log(`app is up and running in port ${ app.get('port') }`))
// }).catch(e => {
//     console.log('mongodb connection error')
//     // console.log(e)
//     process.exit(1)
// })