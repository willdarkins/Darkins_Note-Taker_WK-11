//NPM dependencies
const fs = require('fs');
const path = require('path');

//require() statements  read the index.js files in each of the directories indicated 
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

//Declaring express & deconstructed notes array
const express = require('express');
const { notes } = require('./db/db.json')

//Const representing localhost PORT 3001
const PORT = process.env.PORT || 3001;

//Declaring express() NPM
const app = express();

//Middleware to convert POST data to key/value pairings that can be accessed in the req.body object.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/*Middleware telling server to make public directory available
and to not gate it behind a server endpoint*/
app.use(express.static(path.join(__dirname, 'public')));

//Telling  server  any time a client navigates to <ourhost>/api, the app will use the router set up in apiRoutes & htmlRoutes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

//Telling our app to use specified PORT, if it has been set, and if not, default to port 80.
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});