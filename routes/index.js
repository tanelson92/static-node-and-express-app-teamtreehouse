const express = require('express');
const router = express.Router();
const data = require('../data/projects.json'); 

/* 
* Homepage
*/

router.get('/', (req, res, next) => {
    res.app.locals.projects = data.projects;
    res.render('index', { projects: res.app.locals.projects });
});

/* 
* Project Page
* Get random project from existing projects. 
*/

router.get('/project', (req, res) => {
    const randomProject = Math.floor( Math.random() * data.projects.length );
    res.redirect(`/project/${randomProject}`);
});

/* 
* Project Page
* Select a project page based on the "ID" query provided. 
*/
router.get('/project/:id', (req, res) => {
    let num = parseInt(req.params.id);
    let isANumber = !isNaN(num);
    let noProject = req.params.id >= data.projects.length;
    //Project ID exists, is a number, and projects exist. 
    if (req.params.id && (isANumber && !noProject)) {
        res.locals.project = Object.assign({}, data.projects.find( project => { return project.id === parseInt(req.params.id) }) );
        res.locals.project.image_urls = res.locals.project.image_urls.slice(0,2); //Remove Landing page image.
        res.render('project', res.locals.project);
    } else {
        const err = new Error();
        err.status = 404;
        err.message = 'Oops! Page Not Found.';
        res.status(404).render('page-not-found', err);
    }
});


/* 
* About Page
*/

router.get('/about', (req, res) => {
    res.render('about');
});

module.exports = router;