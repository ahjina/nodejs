// STEP5: create this file routes/api.users.js
// The convention is: with API end point: /api/users, we'll create a file name: api.users.js
// First use the blank template from api.model.js with the model is actually User` and collection named `users`
const User = require('../models/User');
const collection = 'users';
const dateFormat = require('date-fns');

module.exports = router => {
  // STEP6: Implement GET /api/users to get all users from database
  router.get(`/${collection}`, (req, res) => {
    User.find({})
      .exec()
      .then(users => {
        users.forEach(item => {
          item.strDOB = dateFormat.format(item.dob.toString(), 'YYYY-MM-DD');
        });

        res.render('admin/users', {
          title: 'Users',
          users: users,
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
        res.redirect(`/api/${collection}`);
      })
      .catch(err => {
        res.sendRest(err);
      });
  });

  // STEP7: Implement GET /api/users/:id to get one user with provided Id from database
  router.get(`/${collection}/:id/:type`, (req, res) => {
    const id = req.params.id;
    let isDisabled, actionPath;

    if (id === '0') {
      isDisabled = false;
      actionPath = `/api/${collection}`;
      res.render('admin/user-detail', {
        title: 'User',
        isDisabled: isDisabled,
        user: null,
        actionPath: actionPath,
        layout: '/admin/layout'
      });
    } else {
      const type = req.params.type;

      if (type === 'view') isDisabled = true;
      else {
        isDisabled = false;
        actionPath = `/api/${collection}/${id}`;
      }

      User.findOne({ _id: id })
        .exec()
        .then(user => {
          user.strDOB = dateFormat.format(user.dob.toString(), 'YYYY-MM-DD');
          res.render('admin/user-detail', {
            title: 'User',
            isDisabled: isDisabled,
            user: user,
            actionPath: actionPath,
            layout: '/admin/layout'
          });
        })
        .catch(err => {
          res.sendRest(err);
        });
    }
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
