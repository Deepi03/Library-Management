import app from "./app"

app.listen(app.get('port'), () => console.log(`app is up and running in port ${app.get('port')}`))