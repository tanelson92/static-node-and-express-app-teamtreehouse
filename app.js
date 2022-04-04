const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'pug'); //use pug for templates.

const routes = require('./routes/'); //routes/index.js
app.use(routes);

app.use('/static', express.static(path.join(__dirname, 'public')));

/*
* 404 - Page Not Found
*/
app.use((req, res, next) => {
    const err = new Error();
    err.status = 404;
    err.message = 'Oops! Page Not Found.';
    res.render('page-not-found', err);
});

/*
* Error Catch All Page
* Catch all other new errors and render "error" for user. 
*/
app.use((err, req, res, next) => {
    res.status(err.status);
    res.render('error', err);
});

/*
* Express hosting live website. 
*/
app.listen(3000, () => {
    console.log('Static Node and Express App - Unit 6 - Running on localhost:3000');
});