const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const { MongoDB_URI } = require('./configs/keys');


const app = express();

const env = process.env.NODE_ENV || 'development';
console.log('env is ', env);

// Middlewares
app.use(morgan('dev'));

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Routes
app.use('/users', require('./routes/users'));

// connect to database
mongoose.connect(MongoDB_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB successfully`)
})



if (env !== 'development' && app.use(express.static(path.join(__dirname, '/client/build')))) {
    console.log('in client build')
}


if (env !== 'development' && app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
})) {
    console.log('getting files from static build')
}


// Port
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Application running on PORT ${port}`);
})

module.exports = app;