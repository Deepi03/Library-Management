import mongoose, { Schema } from "mongoose"

import app from "./app"

/* connect with shell */
// mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.1')
// .then(() => {
//     app.listen(app.get('port'), () => console.log(`app is up and running in port ${ app.get('port') }`))
// }).catch(e => {
//     console.log('mongodb connection error')
//     process.exit(1)
// })

/*  connect with app */
// mongoose.connect('mongodb+srv://avinashmalla:ean6CkvUbFZ57wR@fs11-backend.hl0kfdn.mongodb.net/fs11-bep?retryWrites=true&w=majority')
mongoose.connect('mongodb+srv://avinashmalla:ean6CkvUbFZ57wR@fs11-bep-cluster.zfi5c.mongodb.net/fs11-backend?retryWrites=true&w=majority')
.then(() => {
    app.listen(app.get('port'), () => console.log(`app is up and running in port ${ app.get('port') }`))
}).catch(e => {
    console.log('mongodb connection error')
    console.log(e)
    process.exit(1)
})
