//Code allowing you to declare routes in any file as long as you use the proper middleware
const router = require('express').Router();

//Using module exported from 'noteRoutes.js'
const noteRoutes = require('../apiRoutes/noteRoutes.js');

//Using apiRoutes/index.js as a central hub for all routing functions we may want to add to the application
router.use(noteRoutes);

//Export router
module.exports = router;