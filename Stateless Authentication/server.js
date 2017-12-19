'use strict';

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/users');
const config = require('./config');

const options = {
    useMongoClient: true
};

mongoose.Promise = global.Promise;
mongoose.connect(config.dbUrl, options);
 
const app = express();

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
 	res.setHeader('Access-Control-Allow-Credentials', 'true');
 	res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, PATCH, POST, PUT, DELETE');
 	res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
// and remove cacheing so we get the most recent comments
 	res.setHeader('Cache-Control', 'no-cache');
 	next();
});


app.use('/users', routes);

app.listen(config.port, () => {
    console.log(`api running on port ${config.port}`);
});