var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  var users, categories, products;

  fs.readFile(
    path.resolve(__dirname, '../data/users.json'),
    'utf8',
    (err, result) => {
      if (err) {
        console.log(err);
        return;
      }

      users = JSON.parse(result);

      fs.readFile(
        path.resolve(__dirname, '../data/categories.json'),
        'utf8',
        (err, data) => {
          if (err) {
            console.log(err);
            return;
          }
          categories = JSON.parse(data);

          fs.readFile(
            path.resolve(__dirname, '../data/products.json'),
            'utf8',
            (err, data) => {
              if (err) {
                console.log(err);
                return;
              }

              products = JSON.parse(data);

              res.render('admin/index', {
                title: 'Dashboard',
                usersCount: users.length,
                categoriesCount: categories.length,
                productsCount: products.length,
                layout: '/admin/layout'
              });
            }
          );
        }
      );
    }
  );
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

      var users = JSON.parse(data);

      res.render('admin/users', {
        title: 'Users',
        users: users,
        layout: '/admin/layout'
      });
    }
  );
});

router.get('/users/:id', function(req, res, next) {
  fs.readFile(
    path.resolve(__dirname, '../data/users.json'),
    'utf8',
    (err, data) => {
      if (err) {
        console.log(err);
        return;
      }

      const id = req.params.id;

      var users = JSON.parse(data);
      var user = users.find(x => x._id === id);

      res.render('admin/user-detail', {
        title: 'User',
        user: user,
        layout: '/admin/layout'
      });
    }
  );
});

router.get('/categories', function(req, res, next) {
  fs.readFile(
    path.resolve(__dirname, '../data/categories.json'),
    'utf8',
    (err, data) => {
      if (err) {
        console.log(err);
        return;
      }

      var categories = JSON.parse(data);

      res.render('admin/categories', {
        title: 'Categories',
        categories: categories,
        layout: '/admin/layout'
      });
    }
  );
});

router.get('/products', function(req, res, next) {
  fs.readFile(
    path.resolve(__dirname, '../data/products.json'),
    'utf8',
    (err, data) => {
      if (err) {
        console.log(err);
        return;
      }

      var products = JSON.parse(data);

      res.render('admin/products', {
        title: 'Products',
        products: products,
        layout: '/admin/layout'
      });
    }
  );
});

router.get('/products/:id', function(req, res, next) {
  fs.readFile(
    path.resolve(__dirname, '../data/products.json'),
    'utf8',
    (err, data) => {
      if (err) {
        console.log(err);
        return;
      }

      const id = req.params.id;

      var products = JSON.parse(data);
      var product = products.find(x => x._id === id);

      res.render('admin/product-detail', {
        title: 'Product',
        product: product,
        layout: '/admin/layout'
      });
    }
  );
});

module.exports = router;
