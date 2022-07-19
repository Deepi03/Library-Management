import mongoose, { Schema } from "mongoose"

import app from "./app"

/*  connect with app */
mongoose.connect('mongodb+srv://avinashmalla:ean6CkvUbFZ57wR@fs11-bep-cluster.zfi5c.mongodb.net/fs11-backend?retryWrites=true&w=majority')
.then(() => {
    app.listen(app.get('port'), () => console.log(`app is up and running in port ${ app.get('port') }`))
}).catch(e => {
    console.log('mongodb connection error')
    // console.log(e)
    process.exit(1)
})