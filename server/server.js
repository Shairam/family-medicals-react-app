const express = require('express');
const mongoose = require('mongoose');

const mongoString = "mongodb+srv://shairam:Sriganthi_2426@learnmongo.wqv4poy.mongodb.net/Medical_data?retryWrites=true&w=majority"

mongoose.connect(mongoString);
const database = mongoose.connection
console.log(mongoString)
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const routes = require('./routes/routes');

const app = express();

app.use(express.json());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
      //respond with 200
      res.send(200);
    }
    else {
    //move on
      next();
    }
});
  

app.use('/api', routes)

app.listen(4000, () => {
    console.log(`Server Started at ${4000}`)
})