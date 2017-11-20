var express = require('express');
var router = express.Router();

// Require our controllers
var article_service = require('../services/articleService');

// ARTICLE ROUTES
/* GET request to find Article. */
router.get('/page/', article_service.article_page);

router.get('/service/', article_service.article_service);

/* GET request to find Article. */
router.get('/page/:term', article_service.article_page);

module.exports = router;
