require("dotenv").config();
const express = require('express');
const { notFound, errorHandlerNotify } = require('strong-errors-handler');
//import Need Routes
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes')
const app = express();
const cors = require('cors');
const dbConnect = require('./config/db');
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
app.use('/', userRoutes);
app.use('/', chatRoutes);
//errorHandler
app.use(notFound)
app.use(errorHandlerNotify)
app.listen(port, () => {
    console.log('listening on', port);
});