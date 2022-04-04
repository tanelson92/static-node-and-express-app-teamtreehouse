const express = require('express');
const router = express.Router();
const data = require('../data/projects.json'); 

/* 
* Homepage
*/

router.get('/', (req, res) => {
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
    res.locals.project = Object.assign({}, data.projects.find( project => { return project.id === parseInt(req.params.id) }) );
    res.locals.project.image_urls = res.locals.project.image_urls.slice(0,2); //Remove Landing page image.
    res.render('project', res.locals.project);
});


/* 
* About Page
*/

router.get('/about', (req, res) => {
    res.render('about');
});

module.exports = router;