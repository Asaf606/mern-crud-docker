var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var port = 4200;
var cors = require('cors');


// Mongoose connection with mongodb
mongoose.Promise = require('bluebird');

const MONGO_URI = process.env.MONGO_URI || "mongodb://db:27017/appdb";

const connectWithRetry = () => {
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // daha tez fail etsin
    })
    .then(() => {
      console.log("MongoDB connected:", MONGO_URI);
    })
    .catch((err) => {
      console.error("MongoDB connection failed, retrying in 2s...", err.message);
      setTimeout(connectWithRetry, 2000);
    });
};

connectWithRetry();
/*
const connectWithRetry = () => {
  mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => {
      console.error("MongoDB connection failed, retrying in 2s...", err.message);
      setTimeout(connectWithRetry, 2000);
    });
};

connectWithRetry();

*/
// Required aplication specific custom router module
var itemRouter = require('./src/routes/itemRouter');

// Use middlewares to set view engine and post json data to the server
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use('/items', itemRouter);

// Start the server
const PORT = process.env.PORT || 4200;

app.listen(PORT, "0.0.0.0", function () {
  console.log("Server is running on Port: ", PORT);
});
