// STEP5: create this file routes/api.users.js
// The convention is: with API end point: /api/users, we'll create a file name: api.users.js
// First use the blank template from api.model.js with the model is actually User` and collection named `users`
const User = require('../models/User');
const Category = require('../models/Category');
const Product = require('../models/Product');
const collection = 'admin';

module.exports = router => {
  // STEP6: Implement GET /api/users to get all users from database
  router.get(`/${collection}`, (req, res) => {
    var userCount, categoriesCount, productCount;
    User.count()
      .exec()
      .then(result => {
        userCount = result;

        return Category.count().exec();
      })
      .then(result => {
        categoriesCount = result;

        return Product.count().exec();
      })
      .then(result => {
        productCount = result;

        res.render('admin/index', {
          title: 'Dashboard',
          usersCount: userCount,
          categoriesCount: categoriesCount,
          productsCount: productCount,
          layout: '/admin/layout'
        });
      })
      .catch(err => {
        res.sendRest(err);
      });
  });

  // STEP8: Implement POST /api/users to create one new user from request's JSON body
  router.post(`/${collection}`, (req, res) => {
    User.create(req.body)
      .then(newUser => {
        res.sendRest(newUser);
      })
      .catch(err => {
        res.sendRest(err);
      });
  });

  // STEP7: Implement GET /api/users/:id to get one user with provided Id from database
  router.get(`/${collection}/:id`, (req, res) => {
    const id = req.params.id;
    User.findOne({ _id: id })
      .exec()
      .then(user => {
        res.sendRest(user);
      })
      .catch(err => {
        res.sendRest(err);
      });
  });

  // STEP9: Implement PATCH /api/users/:id to update one user with provided Id and body payload
  router.patch(`/${collection}/:id`, (req, res) => {
    const id = req.params.id;
    const updatedBody = req.body;
    User.findByIdAndUpdate(id, updatedBody, { runValidators: true })
      .exec()
      .then(user => {
        // Object.assign({}, user.toObject(), updatedBody);
        res.sendRest({ ...user.toObject(), ...updatedBody });
      })
      .catch(err => {
        res.sendRest(err);
      });
  });

  // STEP10: Implement DELETE /api/users/:id to delete one user from database and return that user
  router.delete(`/${collection}/:id`, (req, res) => {
    const id = req.params.id;
    User.findByIdAndRemove(id)
      .exec()
      .then(user => {
        res.sendRest(user);
      })
      .catch(err => {
        res.sendRest(err);
      });
  });
};
