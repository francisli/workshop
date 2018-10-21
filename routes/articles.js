var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET list of articles */
router.get('/', function(req, res, next) {
  models.Article.all().then(function(results) {
    res.render('articles/index', {
       title: 'Articles',
       articles: results
    });
  });
});

/* POST to create a new post */
router.post('/', function(req, res, next) {
  models.Article.create({
    title: req.body.title,
    body: req.body.body
  }).then(function(article) {
    res.redirect(`/articles/${article.id}`)
  });
});

/* GET a form to create a new article */
router.get('/new', function(req, res, next) {
  res.render('articles/new', { title: 'New Article' });
});

/* GET a an editing form */
router.get('/:id/edit', function(req, res, next) {
  models.Article.findById(req.params.id).then(function(article) {
    res.render('articles/edit', {
      title: 'Edit Article',
      article: article
    });
  });
});

/* PATCH update an existing article */
router.patch('/:id', function(req, res, next) {
  models.Article.findById(req.params.id).then(function(article) {
    article.update({
      title: req.body.title,
      body: req.body.body
    }).then(function() {
      res.redirect(`/articles/${article.id}`);
    });
  });
});

/* DELETE a specific article */
router.delete('/:id', function(req, res, next) {
  models.Article.findById(req.params.id).then(function(article) {
    article.destroy().then(function() {
      res.redirect('/articles');
    });
  });
});

/* GET a specific post */
router.get('/:id', function(req, res, next) {
  models.Article.findById(req.params.id).then(function(article) {
    res.render('articles/show', {
      title: 'Show Article',
      article: article
    });
  });
});

module.exports = router;
