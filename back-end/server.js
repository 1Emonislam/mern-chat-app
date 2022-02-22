require('dotenv').config();
const express = require('express');
const dbConnect = require('./config/db');
//import Need Routes
const userRoutes = require('./routes/userRoutes')
const app = express();
const cors = require('cors');
const {notFound,errorHandlerNotify} = require('strong-errors-handler')
const port = process.env.PORT || 5000;
app.get('/', (req, res) => {
    res.send('server running')
})
//middelware 
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//db
dbConnect();
//routes
app.use('/', userRoutes)
//errorHandler
app.use(notFound)
app.use(errorHandlerNotify)
app.listen(port, () => {
    console.log('listening on', port);
});