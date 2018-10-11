var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET list of posts */
router.get('/', function(req, res, next) {
  models.Post.all().then(function(results) {
    res.render('posts/index', {
       title: 'Posts',
       posts: results
    });
  });
});

/* POST to create a new post */
router.post('/', function(req, res, next) {
  models.Post.create({
    title: req.body.title,
    body: req.body.body
  }).then(function(post) {
    res.redirect(`/posts/${post.id}`)
  });
});

/* GET a form to create a new post */
router.get('/new', function(req, res, next) {
  res.render('posts/new', { title: 'New Post' });
});

/* GET a specific post */
router.get('/:id', function(req, res, next) {
  models.Post.findById(req.params.id).then(function(post) {
    res.render('posts/show', {
      title: 'Show Post',
      post: post
    });
  });
});

module.exports = router;
