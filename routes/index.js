const express = require('express');
const router = express.Router();
const data = require('../data/projects.json'); 

//Homepage
router.get('/', (req, res) => {
    res.locals.projects = data.projects;
    res.render('index', { projects: res.locals.projects });
});

//Projects
router.get('/project', (req, res) => {
    const randomProject = Math.floor( Math.random() * data.projects.length );
    res.redirect(`/project/${randomProject}`);
});

router.get('/project/:id', (req, res) => {
    res.locals.project = data.projects.find( project => { return project.id === parseInt(req.params.id) });
    res.render('project', res.locals.project );
});

//About
router.get('/about', (req, res) => {
    res.render('about');
});

module.exports = router;