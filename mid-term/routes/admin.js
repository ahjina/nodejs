var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/index', {
    title: 'Dashboard',
    layout: '/admin/layout'
  });
});

router.get('/users', function(req, res, next) {
  fs.readFile(
    path.resolve(__dirname, '../data/users.json'),
    'utf8',
    (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      res.render('admin/users', {
        title: 'Users',
        users: data,
        layout: '/admin/layout'
      });
    }
  );
});

router.get('/categories', function(req, res, next) {
  res.render('admin/categories', {
    title: 'Categories',
    layout: '/admin/layout'
  });
});

router.get('/products', function(req, res, next) {
  res.render('admin/products', {
    title: 'Products',
    layout: '/admin/layout'
  });
});

module.exports = router;
