//NPM dependencies
const path = require('path');
const router = require('express').Router();

//Route leads to html home page
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

//Route leads to html notes page
router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/notes.html'))
})

//Any route previously defined will fall under this request and will receive the homepage as the response.
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

//Export router
module.exports = router;