const express = require('express'); 
const mongoose = require('mongoose');
const path = require("path")
const mediRoutes=require("./routes/routes")
const authRoutes=require("./routes/authRoutes")
const verifyJWT = require("./middleware/auth")
const mongoString = "mongodb+srv://shairam:Sriganthi_2426@learnmongo.wqv4poy.mongodb.net/Medical_data?retryWrites=true&w=majority"

mongoose.connect(mongoString);

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  //intercepts OPTIONS method
  if ('OPTIONS' === req.method) {
    //respond with 200
    res.sendStatus(200);
  }
  else {
    //move on
    next();
  }
});


app.use('/api', mediRoutes);
app.use('/auth', authRoutes);

app.use(express.static(path.join(__dirname, '../build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html')); // relative path
});


app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`)
})