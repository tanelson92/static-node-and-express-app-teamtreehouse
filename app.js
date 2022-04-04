const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'pug'); //use pug for templates.

const routes = require('./routes/'); //routes/index.js
app.use(routes);

app.use('/static', express.static(path.join(__dirname, 'public')));

//404 
app.use((req, res, next) => {
    const err = new Error();
    err.status = 404;
    err.message = 'Oops! Page Not Found.';
    next(err);
});

//Errors
app.use((err, req, res, next) => {
    res.status(err.status);
    res.render('error', err);
});

app.listen(3000, () => {
    console.log('Static Node and Express App - Unit 6 - Running on localhost:3000');
});