const express = require('express')
const expressLayout = require('express-ejs-layouts')
const indexRouter = require('./routes/index')

const app = express()

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayout)
app.use(express.static('public'))

app.use('/king', indexRouter)

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (err) => console.error(err))
db.once('open', () => console.log('connected to mongoose'))

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log('Server Running on port:',PORT) })
