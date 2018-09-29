var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Workshop!' });
});

router.get('/new-page', function(req, res, next) {
  res.render('new-page', { title: 'New page!' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'New page!' });
});

module.exports = router;
